import configuration from "~/configuration";

const SEND_EMAIL_API_URL = `${configuration.site.siteUrl}/api/emails/send`;

const sendEmailWithApi = (userEmail: string, textsFlagId: string) => {
  fetch(SEND_EMAIL_API_URL, {
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
};

export default sendEmailWithApi;
