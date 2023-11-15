import Head from "next/head";

import configuration from "~/configuration";
import SiteHeader from "~/components/SiteHeader";

import Layout from "~/core/ui/Layout";
import Container from "~/core/ui/Container";
import Footer from "~/components/Footer";
import Heading from "~/core/ui/Heading";

const About = () => {
  return (
    <Layout>
      <Head>
        <title key="title">{`About - ${configuration.site.siteName}`}</title>
      </Head>

      <SiteHeader />

      <Container>
        <div className={"flex flex-col space-y-8 my-8 items-center"}>
          <div className={"flex flex-col items-center space-y-4"}>
            <Heading>About</Heading>
          </div>

          <div className="flex-col space-y-10 md:mt-8 max-w-[800px]">
            <p>
              Back in 2017, a group of passionate and seasoned individuals set out on a remarkable
              journey into the world of generative AI. Their mission was clear: to build a product
              that would not just meet the needs of users but also create genuine love and
              appreciation.
            </p>
            <p>
              This story is engaging, but in simple words we are dedicated to the mission you will
              read about next.
            </p>
            <p>
              {`Day by day, we labored tirelessly, determined to bring our vision to life. Our dream
              was to craft a world-class solution that people couldn't help but talk about, a tool
              that would become an essential part of their digital lives.`}
            </p>
            <p>
              {`For us, the true measure of success has always been the authentic endorsement of our
              product. It's the excitement in a recommendation, the nod of approval in a
              conversation, and the spark that ignites in the eyes of those who've experienced
              something extraordinary. We believe in the power of genuine word-of-mouth.`}
            </p>
            <p>
              {`Our ultimate hope is that our users, like you, will be inspired to share your
              insights, thoughts, and experiences with your friends, your audience, or even with the
              people you meet along your journey. Together, we'll craft a story that's grounded in
              reality, filled with determination, and steeped in the inspirational essence of what
              can be achieved through innovation and the magic of AI.`}
            </p>
            <p>
              Welcome to our world, where dreams become reality, and where every click, every
              interaction, is a testament to the power of progress and the impact of human
              ingenuity.
            </p>
            <div>
              <p>Dima Abramov,</p>
              <p>CEO & co-founder of Audioland</p>
              <p>With love from Austin, Texas</p>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
};

export default About;
