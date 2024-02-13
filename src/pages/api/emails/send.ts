import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "~/core/email/send-email";

import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import {
  EmailTemplateArgs,
  getEventEmailTemplate,
} from "~/lib/emails/hooks/get-event-email-template";
import { EmailTemplate } from "~/lib/emails/templates";

async function sendEmailHandler(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, emailTemplate, args } = req.body;

  const htmlTemplate = getEventEmailTemplate(
    emailTemplate as EmailTemplate,
    args as EmailTemplateArgs,
  );

  await sendEmail({
    to: userEmail,
    subject: htmlTemplate.subject,
    html: htmlTemplate.html,
  });

  return res.send({ success: true });
}

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

export default function emailsHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), sendEmailHandler);

  return withExceptionFilter(req, res)(handler);
}
