import Image from "next/image";
import type { GetStaticPropsContext, GetStaticPathsContext } from "next";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import flagsmith from "flagsmith";

import initFlagsmith from "~/core/flagsmith/hooks/init-flagsmith";
import Container from "~/core/ui/Container";
import SubHeading from "~/core/ui/SubHeading";
import Button from "~/core/ui/Button";
import Heading from "~/core/ui/Heading";
import Layout from "~/core/ui/Layout";
import SiteHeader from "~/components/SiteHeader";
import { withTranslationProps } from "~/lib/props/with-translation-props";
import Footer from "~/components/Footer";
import FeedbackList from "~/components/FeedbackList";

type LanguagePairProps = {
  languageFrom: string;
  languageTo: string;
};

// TODO: change the landing blocks
function LanguagePair({ languageFrom, languageTo }: LanguagePairProps) {
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
              <span>
                Online Audio and Video Dubbing from {languageFrom} to {languageTo}
              </span>
              <span
                className={
                  "bg-gradient-to-br bg-clip-text text-transparent" +
                  " from-primary-400 to-primary-700 leading-[1.2]"
                }
              >
                Our Translation technology can dub any {languageFrom} video and audio into{" "}
                {languageTo}.
              </span>
            </HeroTitle>

            <div className={"flex flex-col items-center space-y-4"}>
              <MainCallToActionButton />

              <span className={"text-xs text-gray-500 dark:text-gray-400"}>
                No credit card required
              </span>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className={"py-24"}>
          <SubHeading className={"text-center"}>
            <span>
              Audioland uses advanced AI technology to dub your video & audio content with the
              original voice
            </span>
            <span>
              Whether you&apos;re a content creator, business owner, marketer, or educator, our tool
              brings your content Global Reach
            </span>
          </SubHeading>
          <div
            className={
              "flex justify-center py-12 max-w-5xl mx-auto animate-in fade-in " +
              " duration-1000 slide-in-from-top-16 fill-mode-both delay-300"
            }
          >
            {/* Видео с пиздящим Димой */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/iy0mfAiQ3Zk?si=wrGr48AvlK5_eH-L"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-16 space-y-16"}>
          <div className={"text-center"}>
            <Heading type={1}>Look at What our Users say about Audioland Dubbing service</Heading>
          </div>
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
        <div className={"flex flex-col items-center justify-center py-[100px] "}>
          <div
            className={
              "flex justify-center py-12 max-w-5xl mx-auto animate-in fade-in " +
              " duration-1000 slide-in-from-top-16 fill-mode-both delay-300"
            }
          >
            <Image
              priority
              className={
                " rounded-2xl" +
                " animate-in fade-in" +
                " zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both"
              }
              width={2688}
              height={1824}
              src={`/assets/images/features-collage-dark.png`}
              alt={`App Image`}
            />
          </div>
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

export default LanguagePair;

//#region ISR

const pathPrefix = "online-audio-video-dubbing-";

//TODO: ISR
export async function getStaticProps({ locale, params }: GetStaticPropsContext) {
  const { props } = await withTranslationProps({ locale });
  const seoLanguagePair = (params?.language as string)?.slice(pathPrefix.length).split("-to-");
  console.log(params?.language);
  return {
    props: {
      ...props,
      languageFrom: seoLanguagePair[0],
      languageTo: seoLanguagePair[1],
    } satisfies LanguagePairProps,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  await initFlagsmith();
  const inputLanguageList: string[] = flagsmith.getValue("requirements_info_tooltip");
  const outputLanguageList: string[] = flagsmith.getValue("languages_list");

  // languageList -> pairs
  let languagePathes: string[] = [];
  for (let i = 0; i < inputLanguageList.length; i++) {
    for (let o = 0; o < outputLanguageList.length; o++) {
      const from = inputLanguageList[i].toLowerCase();
      const to = outputLanguageList[o].toLowerCase();
      languagePathes.push(`${pathPrefix}${from}-to-${to}`);
    }
  }

  return {
    paths: languagePathes.map((language) => ({ params: { language } })),
    fallback: true, // false or "blocking"
  };
}

//#endregion

//#region Components

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

//#endregion
