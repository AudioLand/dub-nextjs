import { Text } from "@react-email/components";
import { renderEmailHtml } from "../hooks/render-email-html";

export const getSumolingActivationEmailTemplate = (activationUrl: string) => {
  const subject = "Activate your Audioland DUB account! 🎉";

  const html = renderEmailHtml(
    <>
      <Text>Hi Sumo-ling!</Text>
      <br />

      <Text>
        You&apos;re a just few clicks away from using the Audioland DUB. Please click the link below
        to activate your account.
      </Text>
      <br />

      <Text>
        If you already activated it via AppSumo, then you&apos;re all set. No need to do anything.
      </Text>
      <br />

      <Text>
        <a href={activationUrl}>Activate Audioland DUB Account</a>
      </Text>
      <br />

      <Text>
        If you&apos;re having trouble with the button above, copy and paste the URL below into your
        web browser.
      </Text>
      <Text>{activationUrl}</Text>
      <br />

      <Text>Have an awesome day!</Text>
      <Text>Audioland Team</Text>
      <br />
    </>,
  );

  return { subject, html };
};
