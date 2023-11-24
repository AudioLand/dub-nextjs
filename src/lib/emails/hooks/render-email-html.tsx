import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Text,
  render,
} from "@react-email/components";
import { ReactNode } from "react";

export const renderEmailHtml = (htmlChildren: ReactNode) => {
  return render(
    <Html lang="en">
      <Head>
        <style>{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 12px;
            text-align: center;
            margin-top: 30px;
          }
          .footer p {
            color: #666;
          }
        `}</style>
      </Head>
      <Body>
        <Container className="container">
          <Section className="header">
            <Img
              src="https://drive.google.com/uc?export=view&id=10awze4te_4duLl61wgkYfebPyRfTL6GF"
              alt="Audioland Logo"
              width={200}
            />
          </Section>

          {htmlChildren}

          <Section className="footer">
            <Text>
              <Link href="#">Forward</Link> | <Link href="#">View online</Link> |{" "}
              <Link href="#">Unsubscribe from the list</Link> |{" "}
              <Link href="#">Update your preferences</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>,
  );
};
