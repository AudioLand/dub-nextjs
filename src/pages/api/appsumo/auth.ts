import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw Error("AppSumo JWT Secret Key is not defined.");
}

const APPSUMO_USERNAME = process.env.APPSUMO_USERNAME;
if (!APPSUMO_USERNAME) {
  throw Error("AppSumo username is not defined.");
}

const APPSUMO_PASSWORD = process.env.APPSUMO_PASSWORD;
if (!APPSUMO_PASSWORD) {
  throw Error("AppSumo password is not defined.");
}

const Body = z.object({
  username: z.string(),
  password: z.string(),
});

const generateJWTToken = (username: string) => {
  const token = sign({ username }, JWT_SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

async function appSumoAuthHandler(req: NextApiRequest, res: NextApiResponse) {
  const body = await Body.parseAsync(req.body);

  if (body.username === APPSUMO_USERNAME || body.password === APPSUMO_PASSWORD) {
    const token = generateJWTToken(body.username);

    return res.status(200).send({
      access: token,
    });
  }

  return res.status(403).send("Something wrong");
}

export default function completeOnboardingHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), appSumoAuthHandler);

  return withExceptionFilter(req, res)(handler);
}
