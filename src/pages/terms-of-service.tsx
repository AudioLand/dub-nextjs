import React from "react";
import Head from "next/head";
import configuration from "~/configuration";
import SiteHeader from "~/components/SiteHeader";
import Layout from "~/core/ui/Layout";
import Container from "~/core/ui/Container";
import Footer from "~/components/Footer";
import Heading from "~/core/ui/Heading";

const TermsOfService = () => {
  return (
    <Layout>
      <Head>
        <title key="title">{`Terms of Service - ${configuration.site.siteName}`}</title>
      </Head>

      <SiteHeader />

      <Container>
        <div className="flex flex-col space-y-8 my-8 items-center">
          <Heading>Terms of Service</Heading>
          <div className="flex-col space-y-10 md:mt-8 max-w-[800px]">
            <section>
              <Heading type={2}>1. Acceptance of Terms</Heading>
              <p>
                By using the services provided by Audioland (“Service”), you agree to be bound by
                these Terms of Service (“Terms”). If you do not agree to these Terms, do not use the
                Service.
              </p>
            </section>

            <section>
              <Heading type={2}>2. Description of Service</Heading>
              <p>
                Audioland provides a platform for dubbing audio and video content into various
                languages. This service may include, but is not limited to, translation, voice-over,
                and synchronization of content.
              </p>
            </section>

            <section>
              <Heading type={2}>3. User Obligations</Heading>
              <p>
                You agree to use the Service in compliance with all applicable laws and regulations
                and not to use the Service for any unlawful purposes. You are responsible for all
                content you submit for dubbing and must have the necessary rights and permissions
                for such content.
              </p>
            </section>

            <section>
              <Heading type={2}>4. Intellectual Property Rights</Heading>
              <p>
                The original content remains the property of its respective owners. Audioland claims
                no ownership rights over the content submitted by users. However, by using the
                Service, you grant Audioland the right to use the content for the purpose of
                providing the dubbing service.
              </p>
            </section>

            <section>
              <Heading type={2}>5. User-Generated Content</Heading>
              <p>
                Audioland is not responsible for the content submitted by users and does not endorse
                any such content. You acknowledge that Audioland may not pre-screen content, but has
                the right (but not the obligation) to refuse or remove any content available via the
                Service.
              </p>
            </section>

            <section>
              <Heading type={2}>6. Privacy</Heading>
              <p>
                Your privacy is important to us. Please refer to our Privacy Policy for information
                on how we collect, use, and disclose information from our users.
              </p>
            </section>

            <section>
              <Heading type={2}>7. Modifications to the Service</Heading>
              <p>
                Audioland reserves the right at any time to modify or discontinue, temporarily or
                permanently, the Service (or any part thereof) with or without notice.
              </p>
            </section>

            <section>
              <Heading type={2}>8. Disclaimers and Limitations of Liability</Heading>
              <p>
                Audioland provides the Service on an “as is” and “as available” basis. Audioland
                shall not be liable for any direct, indirect, incidental, special, consequential, or
                punitive damages resulting from the use or inability to use the Service.
              </p>
            </section>

            <section>
              <Heading type={2}>9. Indemnity</Heading>
              <p>
                You agree to indemnify and hold Audioland, its officers, directors, employees, and
                agents harmless from any claims, damages, losses, or expenses (including attorneys
                fees) arising from your use of the Service.
              </p>
            </section>

            <section>
              <Heading type={2}>10. Governing Law</Heading>
              <p>
                These Terms shall be governed by the laws of the jurisdiction in which Audioland is
                registered, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <Heading type={2}>11. Changes to Terms</Heading>
              <p>
                Audioland reserves the right to update or change these Terms at any time and
                recommends that users periodically review them.
              </p>
            </section>

            <section>
              <Heading type={2}>12. Contact Information</Heading>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:help@audioland.io">help@audioland.io</a>.
              </p>
            </section>
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
};

export default TermsOfService;
