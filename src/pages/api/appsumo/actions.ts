import { JwtPayload, sign, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import configuration from "~/configuration";
import { withAdmin } from "~/core/middleware/with-admin";
import withCors from "~/core/middleware/with-cors";
import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import { enhanceTier } from "~/lib/appsumo/actions/enhance-tier";
import { isSumolingExists } from "~/lib/appsumo/actions/is-sumo-ling-exists";
import { reduceTier } from "~/lib/appsumo/actions/reduce-tier";
import { refundTier } from "~/lib/appsumo/actions/refund-tier";
import { APPSUMO_DOMAIN } from "~/lib/appsumo/cors-domains";
import { JWT_SECRET_KEY } from "~/lib/appsumo/credentials";
import { addSumolingInvoiceItem } from "~/lib/appsumo/hooks/update-invoice-item-uuid";
import { RequestActions } from "~/lib/appsumo/request-actions.enum";
import { AppSumoReqData } from "~/lib/appsumo/types/sumo-ling-data";

const APPSUMO_AUTH_URL = `${configuration.site.siteUrl}${configuration.paths.appsumoAuthActivate}`;

const getToken = (token?: string) => {
  return token?.split("Bearer ")[1];
};

const isTokenExpired = (token: string) => {
  try {
    const decodedToken = verify(token, JWT_SECRET_KEY) as JwtPayload;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (!decodedToken.exp || decodedToken.exp < currentTimestamp) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
};

const generateJWTTokenWithSumolingData = ({
  planId,
  uuid,
  activationEmail,
  invoiceItemUUID,
}: AppSumoReqData) => {
  const token = sign(
    {
      planId,
      uuid,
      activationEmail,
      invoiceItemUUID,
    },
    JWT_SECRET_KEY,
  );
  return token;
};

const Body = z.object({
  action: z.string(),
  plan_id: z.string(),
  activation_email: z.string(),
  uuid: z.string(),
  invoice_item_uuid: z.string().optional(),
});

async function actionsHandler(req: NextApiRequest, res: NextApiResponse) {
  const token = getToken(req.headers.authorization);

  if (!token || isTokenExpired(token)) {
    return res.status(403).send("Token expired");
  }

  const body = await Body.parseAsync(req.body);

  switch (body.action) {
    case RequestActions.Activation:
      if (!body.invoice_item_uuid) {
        return res.status(400).send("invoice_item_uuid in not defined");
      }

      if (await isSumolingExists(body.uuid)) {
        return res.status(400).send(`User with uuid ${body.uuid} is already exists`);
      }

      await addSumolingInvoiceItem(body.plan_id, body.uuid, body.invoice_item_uuid);

      const token = generateJWTTokenWithSumolingData({
        planId: body.plan_id,
        uuid: body.uuid,
        activationEmail: body.activation_email,
        invoiceItemUUID: body.invoice_item_uuid,
      });

      const params = new URLSearchParams();
      params.append("token", token);
      const activationUrl = `${APPSUMO_AUTH_URL}?${params.toString()}`;

      // TODO: send activation url to sumo-ling email
      // await sendEmailWithApi(body.activation_email, EmailTemplate.SumolingActivation, {
      //   activationUrl,
      // });

      return res.status(201).json({
        message: "product activated",
        redirect_url: activationUrl,
      });

    case RequestActions.EnhanceTier:
      await enhanceTier(body.uuid, body.plan_id);

      return res.status(200).json({
        message: "product enhanced",
      });

    case RequestActions.ReduceTier:
      await reduceTier(body.uuid, body.plan_id);

      return res.status(200).json({
        message: "product reduced",
      });

    case RequestActions.Refund:
      if (!body.invoice_item_uuid) {
        return res.status(400).send("invoice_item_uuid in not defined");
      }

      await addSumolingInvoiceItem(body.plan_id, body.uuid, body.invoice_item_uuid);
      await refundTier(body.uuid);

      return res.status(200).json({
        message: "product refunded",
      });

    case RequestActions.Update:
      if (!body.invoice_item_uuid) {
        return res.status(400).send("invoice_item_uuid in not defined");
      }

      await addSumolingInvoiceItem(body.plan_id, body.uuid, body.invoice_item_uuid);

      return res.status(200).json({
        message: "product updated",
      });
  }

  return res.status(400).send("Wrong body data");
}

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

export default function appsumoActionsHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), withAdmin, actionsHandler);

  withCors(res, APPSUMO_DOMAIN);

  if (req.method === `OPTIONS`) {
    res.setHeader("Access-Control-Allow-Methods", "POST");

    return res.end();
  }

  return withExceptionFilter(req, res)(handler);
}
