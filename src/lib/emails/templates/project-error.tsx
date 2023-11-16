import { Text } from "@react-email/components";
import { renderEmailHtml } from "./render-email-html";

export const getProjectErrorEmailTemplate = () => {
  const subject = "Attention Needed: Your Project Hit a Snag 🛠️";

  const html = renderEmailHtml(
    <>
      <Text>Hello,</Text>
      <br />

      <Text>
        Dima here. It looks like your recent project ran into a bit of trouble. But don&apos;t
        worry, our team is on it!
      </Text>
      <br />

      <Text>
        Could you take a moment to check the details and let us know if there&apos;s anything
        specific we should know?
      </Text>
      <br />

      <Text>Together,</Text>
      <Text>Dima A</Text>
      <Text>CEO & Co-founder, Audioland</Text>
    </>,
  );

  return { subject, html };
};
