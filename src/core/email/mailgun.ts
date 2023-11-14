import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

const MAILGUN_APY_KEY = process.env.NEXT_PUBLIC_MAILGUN_API_KEY;

if (!MAILGUN_APY_KEY) {
  throw new Error("Mailgun API key is not defined");
}

export const mg = mailgun.client({
  username: "api",
  key: MAILGUN_APY_KEY,
});

export const MAILING_LIST = process.env.NEXT_PUBLIC_MAILGUN_MAILING_LIST!;
