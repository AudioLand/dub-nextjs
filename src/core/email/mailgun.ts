import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

const MAILGUN_API_KEY = process.env.NEXT_PUBLIC_MAILGUN_API_KEY;

if (!MAILGUN_API_KEY) {
  throw new Error("Mailgun API key is not defined");
}

export const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY,
});

const MAILING_LIST_ENV = process.env.NEXT_PUBLIC_MAILGUN_MAILING_LIST;

if (!MAILING_LIST_ENV) {
  throw new Error("Mailgun mailing list is not defined");
}

export const MAILING_LIST = MAILING_LIST_ENV;
