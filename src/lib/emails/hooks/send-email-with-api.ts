import configuration from "~/configuration";

const SEND_EMAIL_API_URL = `${configuration.site.siteUrl}/api/emails/send`;

const sendEmailWithApi = async (userEmail: string, textsFlagId: string) => {
  const response = await fetch(SEND_EMAIL_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail,
      textsFlagId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email sending failed with status ${response.status}`);
  }
};

export default sendEmailWithApi;
