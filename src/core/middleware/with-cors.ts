import { NextApiResponse } from "next";

/**
 * @name withCors
 * @param res
 * @description Enables CORS for the API route
 *
 * Usage:
 * function apiHandler(req: NextApiRequest, res: NextApiResponse) {
 *  withCors(res);
 * }
 *
 * Or
 * withPipe(
 *  withCors,
 * )
 *
 */
function withCors(res: NextApiResponse, domain: string | ReadonlyArray<string>) {
  res.setHeader("Access-Control-Allow-Origin", domain);

  res.setHeader(
    "Access-Control-Allow-Headers",
    `Origin, X-Requested-With, Content-Type, Accept, referrer-path`,
  );
}

export default withCors;
