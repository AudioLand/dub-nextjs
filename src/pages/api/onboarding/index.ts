import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { withAuthedUser } from "~/core/middleware/with-authed-user";
import withCsrf from "~/core/middleware/with-csrf";
import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import sendEmailWithApi from "~/lib/emails/hooks/send-email-with-api";
import { EmailTemplate } from "~/lib/emails/templates";
import { completeOnboarding } from "~/lib/server/onboarding/complete-onboarding";

const Body = z.object({
  organization: z.string(),
});

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

async function onboardingHandler(req: NextApiRequest, res: NextApiResponse) {
  const body = await Body.parseAsync(req.body);
  const userId = req.firebaseUser.uid;
  const userEmail = req.firebaseUser.email;

  const data = {
    userId,
    organizationName: body.organization,
  };

  await completeOnboarding(data);

  //* Send welcome email to user
  if (userEmail) {
    sendEmailWithApi(userEmail, EmailTemplate.Welcome);
  } else {
    console.error("User email is not defined in registration request");
  }

  return res.send({ success: true });
}

export default function completeOnboardingHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(
    withCsrf(),
    withMethodsGuard(SUPPORTED_HTTP_METHODS),
    withAuthedUser,
    onboardingHandler,
  );

  return withExceptionFilter(req, res)(handler);
}
