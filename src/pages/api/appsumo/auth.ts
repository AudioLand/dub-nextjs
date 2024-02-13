import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import {
  APPSUMO_PASSWORD,
  APPSUMO_USERNAME,
  JWT_SECRET_KEY,
} from "../../../lib/appsumo/credentials";
import withCors from "~/core/middleware/with-cors";

const Body = z.object({
  username: z.string(),
  password: z.string(),
});

const generateJWTToken = (username: string) => {
  const token = sign({ username }, JWT_SECRET_KEY, { expiresIn: "10m" });
  return token;
};

async function authHandler(req: NextApiRequest, res: NextApiResponse) {
  const body = await Body.parseAsync(req.body);

  if (body.username === APPSUMO_USERNAME && body.password === APPSUMO_PASSWORD) {
    const token = generateJWTToken(body.username);

    return res.status(200).json({ access: token });
  }

  return res.status(403).send("Something wrong");
}

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

export default function appsumoAuthHandler(req: NextApiRequest, res: NextApiResponse) {
  withCors(res);
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), authHandler);

  return withExceptionFilter(req, res)(handler);
}
