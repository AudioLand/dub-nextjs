import { JwtPayload, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import configuration from "~/configuration";
import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import { enhanceSumolingTier } from "~/lib/appsumo/actions/enhance-tier";
import { reduceSumolingTier } from "~/lib/appsumo/actions/reduce-tier";
import { refundSumoling } from "~/lib/appsumo/actions/refund";
import { RequestActions } from "~/lib/appsumo/request-actions.enum";
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

  switch (body.action) {
    case RequestActions.Activation:
      // TODO: add activating email
      if (!body.invoice_item_uuid) {
        return res.status(400).send("invoice_item_uuid in not defined");
      }

      const params = new URLSearchParams();
      params.append("plan_id", body.plan_id);
      params.append("activation_email", body.activation_email);
      params.append("uuid", body.uuid);
      params.append("invoice_item_uuid", body.invoice_item_uuid);

      return res.status(201).send({
        message: "product activated",
        redirect_url: `${APPSUMO_AUTH_URL}?${params.toString()}`,
      });

    case RequestActions.EnhanceTier:
      // TODO: add enhancing tier
      enhanceSumolingTier();

      return res.status(200).send({
        message: "product enhanced",
      });

    case RequestActions.ReduceTier:
      // TODO: add reducing tier
      reduceSumolingTier();

      return res.status(200).send({
        message: "product reduced",
      });

    case RequestActions.Refund:
      // TODO: add refunding
      refundSumoling();

      return res.status(200).send({
        message: "product refunded",
      });
  }

  return res.status(400).send("Something wrong");
}

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

export default function appsumoActionsHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), actionsHandler);

  return withExceptionFilter(req, res)(handler);
}
