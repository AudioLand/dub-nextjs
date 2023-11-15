import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { sendEmail } from "~/core/email/send-email";

import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import fetchEventEmailText from "~/lib/emails/hooks/fetch-event-emails-texts";

const Body = z.object({
  userEmail: z.string(),
  textsFlagId: z.string(),
});

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

async function sendEmailHandler(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, textsFlagId } = await Body.parseAsync(req.body);

  const eventEmailTexts = await fetchEventEmailText(textsFlagId);
  await sendEmail({
    to: userEmail,
    subject: eventEmailTexts.subject,
    text: eventEmailTexts.text,
  });

  return res.send({ success: true });
}

export default function emailsHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), sendEmailHandler);

  return withExceptionFilter(req, res)(handler);
}
