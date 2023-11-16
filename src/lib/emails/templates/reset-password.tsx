import { Text } from "@react-email/components";
import { renderEmailHtml } from "./render-email-html";

export const getResetPasswordEmailTemplate = (returnUrl: string) => {
  const subject = "Reset Your Audioland Password 🔒";

  const html = renderEmailHtml(
    <>
      <Text>Hello!</Text>
      <br />

      <Text>
        I heard you needed to reset your password. No problem! Click the link below to get back on
        track:
      </Text>
      <br />

      <Text>{returnUrl}</Text>
      <br />

      <Text>If you didn&apos;t request a password reset, please let me know right away.</Text>
      <br />

      <Text>Stay secure,</Text>
      <Text>Dima A</Text>
      <Text>CEO & Co-founder, Audioland</Text>
    </>,
  );

  return { subject, html };
};
