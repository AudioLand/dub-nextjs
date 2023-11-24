import configuration from "~/configuration";
import { EmailTemplate } from "../templates";
import { EmailTemplateArgs } from "./get-event-email-template";

const SEND_EMAIL_API_URL = `${configuration.site.siteUrl}/api/emails/send`;

const sendEmailWithApi = async (
  userEmail: string,
  emailTemplate: EmailTemplate,
  args?: EmailTemplateArgs,
) => {
  const response = await fetch(SEND_EMAIL_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail,
      emailTemplate,
      args,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Email ${emailTemplate} sending failed with status ${
        response.status
      }. Details: ${await response.text()}`,
    );
  }
};

export default sendEmailWithApi;
