import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { sendEmail } from "~/core/email/send-email";

import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";

const Body = z.object({
  userEmail: z.string(),
  htmlTemplate: z.object({
    subject: z.string(),
    html: z.string(),
  }),
});

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

async function sendEmailHandler(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, htmlTemplate } = await Body.parseAsync(req.body);

  // const eventEmailTexts = await fetchEventEmailText(textsFlagId);
  await sendEmail({
    to: userEmail,
    subject: htmlTemplate.subject,
    html: htmlTemplate.html,
  });

  return res.send({ success: true });
}

export default function emailsHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), sendEmailHandler);

  return withExceptionFilter(req, res)(handler);
}
