import { Resend } from "resend";
import configuration from "~/configuration";
import {
  EmailTemplateArgs,
  getEventEmailTemplate,
} from "~/lib/emails/hooks/get-event-email-template";
import { isDevEnv } from "~/lib/is-dev-env";
import { EmailTemplate } from "../email-templates.enum";

const API_KEY = configuration.emails.apiKey;

if (!API_KEY) {
  throw Error("Resend API key is not defined");
}

const mailer = new Resend(API_KEY);

const from = configuration.emails;

export async function sendEmail(
  emailTo: string,
  template: EmailTemplate,
  args?: EmailTemplateArgs,
) {
  if (!from.sender || !from.address) {
    throw Error(
      `Missing email configuration. Please add the following environment variables:
      EMAIL_FROM_SENDER
      EMAIL_FROM_ADDRESS
      `,
    );
  }

  const emailFrom = `${from.sender} <${from.address}>`;

  // We do not send real email to not spend month emails quota
  if (isDevEnv()) {
    console.log(`Sending email from "${emailFrom}" to "${emailTo} with ${template}..."`);
    return;
  }

  const htmlTemplate = getEventEmailTemplate(template, args);

  return mailer.emails.send({
    from: emailFrom,
    to: emailTo,
    subject: htmlTemplate.subject,
    html: htmlTemplate.html,
  });
}
