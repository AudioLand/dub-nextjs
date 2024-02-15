import { NextApiRequest, NextApiResponse } from "next";
import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import { sendEmail } from "~/lib/emails/hooks/send-email";

async function sendEmailHandler(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, emailTemplate, args } = req.body;

  await sendEmail(userEmail, emailTemplate, args);

  return res.send({ success: true });
}

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

export default function emailsHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), sendEmailHandler);

  return withExceptionFilter(req, res)(handler);
}
