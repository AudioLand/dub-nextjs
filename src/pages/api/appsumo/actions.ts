import { JwtPayload, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import configuration from "~/configuration";
import { withAdmin } from "~/core/middleware/with-admin";
import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import { RequestActions } from "~/lib/appsumo/request-actions.enum";
import { activateSumoling } from "../../../lib/appsumo/actions/activate-sumo-ling";
import { enhanceTier } from "../../../lib/appsumo/actions/enhance-tier";
import { reduceTier } from "../../../lib/appsumo/actions/reduce-tier";
import { refundTier } from "../../../lib/appsumo/actions/refund-tier";
import { JWT_SECRET_KEY } from "../../../lib/appsumo/credentials";

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

  if (!body.invoice_item_uuid) {
    return res.status(400).send("invoice_item_uuid in not defined");
  }

  switch (body.action) {
    case RequestActions.Activation:
      const token = await activateSumoling({
        planId: body.plan_id,
        uuid: body.uuid,
        activationEmail: body.activation_email,
        invoiceItemUUID: body.invoice_item_uuid,
      });

      if (!token) {
        return res.status(400).send(`User with uuid ${body.uuid} is already exists`);
      }

      const params = new URLSearchParams();
      params.append("token", token);

      return res.status(201).send({
        message: "product activated",
        redirect_url: `${APPSUMO_AUTH_URL}?${params.toString()}`,
      });

    case RequestActions.EnhanceTier:
      await enhanceTier(body.uuid, body.plan_id, body.invoice_item_uuid);

      return res.status(200).send({
        message: "product enhanced",
      });

    case RequestActions.ReduceTier:
      await reduceTier(body.uuid, body.plan_id, body.invoice_item_uuid);

      return res.status(200).send({
        message: "product reduced",
      });

    case RequestActions.Refund:
      await refundTier(body.uuid, body.invoice_item_uuid);

      return res.status(200).send({
        message: "product refunded",
      });
  }

  return res.status(400).send("Wrong body data");
}

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

export default function appsumoActionsHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), withAdmin, actionsHandler);

  return withExceptionFilter(req, res)(handler);
}
