import React from "react";
import Head from "next/head";

import configuration from "~/configuration";
import SiteHeader from "~/components/SiteHeader";
import Layout from "~/core/ui/Layout";
import Container from "~/core/ui/Container";
import Footer from "~/components/Footer";
import Heading from "~/core/ui/Heading";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Head>
        <title key="title">{`Privacy Policy - ${configuration.site.siteName}`}</title>
      </Head>

      <SiteHeader />

      <Container>
        <div className="flex flex-col space-y-8 my-8 items-center">
          <Heading>Privacy Policy</Heading>

          <div className="flex flex-col space-y-4 max-w-[800px]">
            <Heading type={2}>Introduction</Heading>
            <p>
              Welcome to Audioland! We specialize in providing audio and video dubbing services in
              various languages. This Privacy Policy explains how we collect, use, store, and
              protect the information of our users (you). By using our services, you agree to the
              collection and use of information in accordance with this policy.
            </p>

            <Heading type={2}>Information We Collect</Heading>
            <Heading type={3}>Personal Information</Heading>
            <ul>
              <li>
                <strong>Account Information</strong>: Your email address and password for account
                creation and management.
              </li>
              <li>
                <strong>Contact Details</strong>: Your name, email address, and contact number for
                communication purposes.
              </li>
            </ul>

            <Heading type={3}>Non-Personal Information</Heading>
            <ul>
              <li>
                <strong>Usage Data</strong>: Information on how the service is accessed and used
                (e.g., time spent, pages visited).
              </li>
              <li>
                <strong>Device Information</strong>: Type of device used, operating system, browser
                type, and IP address.
              </li>
            </ul>

            <Heading type={3}>Content</Heading>
            <p>
              <strong>Audio/Video Files</strong>: We temporarily store the audio/video files you
              upload for dubbing.
            </p>

            <Heading type={2}>How We Use Your Information</Heading>
            <ul>
              <li>
                <strong>To Provide Our Service</strong>: Your information is used to manage your
                account, provide customer support, and deliver our dubbing services.
              </li>
              <li>
                <strong>To Improve Our Service</strong>: We analyze usage data to enhance our
                offerings and user experience.
              </li>
              <li>
                <strong>Communication</strong>: To contact you with service-related notices and
                promotional messages.
              </li>
            </ul>

            <Heading type={2}>Data Storage and Security</Heading>
            <p>
              Your data is stored and secured using services provided by Firebase, Microsoft Azure,
              and Google Cloud. We implement industry-standard security measures to protect your
              data from unauthorized access. Follow to the bottom of the document to find out
              physical locations.
            </p>

            <Heading type={2}>Sharing of Information</Heading>
            <p>
              We may share your information with our service providers strictly for the purpose of
              providing and improving our services. These providers have their own privacy policies
              governing the use and disclosure of information.
            </p>

            <Heading type={2}>Data Retention</Heading>
            <p>
              We retain your personal information as long as necessary to provide our services and
              comply with legal obligations. Non-personal information may be retained indefinitely
              for analytics.
            </p>

            <Heading type={2}>Your Rights</Heading>
            <p>
              You have the right to access, update, or delete your personal information. Please
              contact us to exercise these rights.
            </p>

            <Heading type={2}>Children’s Privacy</Heading>
            <p>
              Our service is not intended for individuals under the age of 13. We do not knowingly
              collect personal information from children without parental consent.
            </p>

            <Heading type={2}>Changes to This Privacy Policy</Heading>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on our website.
            </p>

            <Heading type={2}>Contact Us</Heading>
            <p>
              For questions or concerns about our Privacy Policy, please contact us at{" "}
              <a href="mailto:help@audioland.io">help@audioland.io</a>.
            </p>

            <Heading type={1}>Physical locations of the used data centers</Heading>
            <Heading type={3}>Firebase</Heading>
            <p>
              Iowa, Nebraska, Oregon, South Carolina, Virginia, Belgium, Finland, Frankfurt,
              Ireland, London, Netherlands, Sweden, São Paulo, Hong Kong, Mumbai, Osaka, Singapore,
              Sydney, Taiwan, Sydney, Doha
            </p>

            <Heading type={3}>Microsoft Azure</Heading>
            <p>
              California, Illinois, Texas, Virginia, Amsterdam, Dublin, Finland, France, Germany,
              Ireland, Netherlands, Norway, Switzerland, UK, China, Hong Kong, India, Japan, Korea,
              Singapore, Canberra, Melbourne, Perth, Sydney, Brazil, Chile, Dubai, Israel
            </p>

            <Heading type={3}>Google Cloud</Heading>
            <p>
              Council Bluffs, Iowa, Lenoir, North Carolina, Papillion, Nebraska, The Dalles, Oregon,
              Loudoun County, Virginia, Belgium, Finland, Frankfurt, Hamina, Ireland, London,
              Middenmeer, Netherlands, Oslo, Poland, Stockholm, Zürich, Changhua, Chungli, Hong
              Kong, Mumbai, Osaka, Singapore, Sydney, Taiwan, Tokyo, Melbourne, Sydney, São Paulo
            </p>
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
};

export default PrivacyPolicy;
