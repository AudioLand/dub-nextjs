import { Text } from "@react-email/components";
import { renderEmailHtml } from "../hooks/render-email-html";

export const getWelcomeEmailTemplate = () => {
  const subject = "Welcome Aboard the Audioland Express! 🎉";

  const html = renderEmailHtml(
    <>
      <Text>Hey there!</Text>
      <br />

      <Text>
        It&apos;s Dima here, CEO and Co-founder of Audioland. I&apos;m super excited to welcome you
        to our family! You&apos;ve just unlocked a world where language barriers are a thing of the
        past.
      </Text>
      <br />

      <Text>
        Dive in and start exploring all the amazing features we&apos;ve cooked up for you. If you
        have any questions or just want to share your excitement, I&apos;m all ears!
      </Text>
      <br />

      <Text>Cheers to new beginnings,</Text>
      <Text>Dima A</Text>
      <Text>CEO & Co-founder, Audioland</Text>
    </>,
  );

  return { subject, html };
};
