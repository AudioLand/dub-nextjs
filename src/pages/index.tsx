import Image from "next/image";
import { GetStaticPropsContext } from "next";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

import Container from "~/core/ui/Container";
import SubHeading from "~/core/ui/SubHeading";
import Button from "~/core/ui/Button";
import Heading from "~/core/ui/Heading";
import Layout from "~/core/ui/Layout";
import SiteHeader from "~/components/SiteHeader";
import { withTranslationProps } from "~/lib/props/with-translation-props";
import Footer from "~/components/Footer";
import FeedbackList from "~/components/FeedbackList";

function Index() {
  return (
    <Layout>
      <SiteHeader />

      <Container>
        <div
          className={
            "my-12 flex flex-col items-center md:flex-row lg:my-16" +
            " mx-auto flex-1 justify-center animate-in fade-in " +
            " duration-1000 slide-in-from-top-12"
          }
        >
          <div className={"flex w-full flex-1 flex-col items-center space-y-8"}>
            <Pill>
              <span>Fast. Fun. Magical.</span>
            </Pill>

            <HeroTitle>
              <span>Make your content speak different languages</span>
              <span
                className={
                  "bg-gradient-to-br bg-clip-text text-6xl text-transparent" +
                  " from-primary-400 to-primary-700 leading-[1.2]"
                }
              >
                Enhance Your Video & Audio Content Global Reach at a click of a button
              </span>
            </HeroTitle>

            <SubHeading className={"text-center"}>
              <span>Revolutionary AI-Powered Audio & Video Dubbing</span>
              <span>Cutting-Edge Voice Cloning Technology</span>
              <span>Achieve Natural, Human-Like Voices</span>
            </SubHeading>

            <div className={"flex flex-col items-center space-y-4"}>
              <MainCallToActionButton />

              <span className={"text-xs text-gray-500 dark:text-gray-400"}>
                No credit card required
              </span>
            </div>
          </div>
        </div>

        <div>
          <SubHeading className={"text-center"}>
            <span>
              Audioland uses advanced AI technology to dub your video & audio content with the
              original voice
            </span>
            <span>
              {
                "Whether you're a content creator, business owner, marketer, or educator, our tool brings your content Global Reach"
              }
            </span>
          </SubHeading>
          <div
            className={
              "flex justify-center py-12 max-w-5xl mx-auto animate-in fade-in " +
              " duration-1000 slide-in-from-top-16 fill-mode-both delay-300"
            }
          >
            <Image
              priority
              className={
                "shadow-[0_0_1000px_0] rounded-2xl" +
                " shadow-primary/40 animate-in fade-in" +
                " zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both"
              }
              width={2688}
              height={1824}
              src={`/assets/images/projects-dark.png`}
              alt={`App Image`}
            />
          </div>
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-16 space-y-16"}>
          <Heading type={2}>Look at What our Users say about Audioland Dubbing service</Heading>
          <FeedbackList />
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-16 space-y-16"}>
          <div className={"flex flex-col items-center space-y-8 text-center"}>
            <Pill>Get started for free. No credit card required. Cancel anytime.</Pill>

            <div className={"flex flex-col space-y-6"}>
              <Heading type={1}>Ready to make your video or audio multilingual?</Heading>

              <SubHeading>FREE to TRY. Worth to keep.</SubHeading>
              <div className={"flex flex-col items-center space-y-4"}>
                <MainCallToActionButton />

                <span className={"text-xs text-gray-500 dark:text-gray-400"}>
                  Powered by Handpicked Technologies
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-24 "}>
          <div
            className={
              "flex justify-center py-12 max-w-5xl mx-auto animate-in fade-in " +
              " duration-1000 slide-in-from-top-16 fill-mode-both delay-300"
            }
          >
            <Image
              priority
              className={
                "shadow-[0_0_1000px_0] rounded-2xl" +
                " shadow-primary/40 animate-in fade-in" +
                " zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both"
              }
              width={2688}
              height={1824}
              src={`/assets/images/projects-dark.png`}
              alt={`App Image`}
            />
          </div>
          <SubHeading className={"text-center"}>
            <span>Your own voice speak different languages</span>
            <span>Multi cast dubbing</span>
            <span>70+ languages</span>
            <span>1,100+ stock voices to choose from</span>
          </SubHeading>
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-16 space-y-16"}>
          <div className={"flex flex-col items-center space-y-8 text-center"}>
            <div className={"flex flex-col space-y-6 items-center"}>
              <Heading type={1}>Seamlessly Translate Your Content into Multiple Languages.</Heading>

              <SubHeading className="max-w-2xl">
                Make your audience captivated by listening to you in their mother tongue with just a
                couple of clicks.
              </SubHeading>
              <div className={"flex flex-col items-center space-y-4"}>
                <MainCallToActionButton />

                <span className={"text-xs text-gray-500 dark:text-gray-400"}>
                  No credit card required
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
}

export default Index;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { props } = await withTranslationProps({ locale });

  return {
    props,
  };
}

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        "text-center text-4xl text-gray-600 dark:text-white md:text-5xl" +
        " flex flex-col font-heading font-medium xl:text-6xl 2xl:text-7xl"
      }
    >
      {children}
    </h1>
  );
}

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        "inline-flex w-auto items-center space-x-2" +
        " rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400" +
        " dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm" +
        " font-normal text-gray-500 dark:text-transparent shadow" +
        " dark:shadow-dark-700"
      }
    >
      <span>{props.children}</span>
    </h2>
  );
}

function MainCallToActionButton() {
  return (
    <Button
      className={
        "bg-transparent bg-gradient-to-r shadow-2xl" +
        " hover:shadow-primary/60 from-primary" +
        " to-primary-600 hover:to-indigo-600 text-white"
      }
      variant={"custom"}
      size={"lg"}
      round
      href={"/auth/sign-up"}
    >
      <span className={"flex items-center space-x-2"}>
        <span>Try now for Free</span>
        <ChevronRightIcon
          className={
            "h-4 animate-in fade-in slide-in-from-left-8" +
            " delay-1000 fill-mode-both duration-1000 zoom-in"
          }
        />
      </span>
    </Button>
  );
}
