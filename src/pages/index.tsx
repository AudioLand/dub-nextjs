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
import flagsmith from "flagsmith";
import initFlagsmith from "~/core/flagsmith/hooks/init-flagsmith";
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";
import Link from "next/link";
import configuration from "~/configuration";

interface LandingProps {
  outputLanguageAmount: number;
  languageTableLinks: {
    language: keyof typeof configuration.languageEmojis;
    link: string;
  }[];
}

function Index(props: LandingProps) {
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
              <span className="mb-6">Make your content speak different languages</span>
              <span
                className={
                  "bg-gradient-to-br bg-clip-text text-transparent" +
                  " from-primary-400 to-primary-700 leading-[1.2] text-[35px]"
                }
              >
                Enhance Your Video & Audio Content Global Reach <br /> at a click of a button
              </span>
            </HeroTitle>

            <SubHeading className={"text-center"}>
              <span>★&nbsp;Revolutionary AI-Powered Audio & Video Dubbing&nbsp;★</span>
              <span>★&nbsp;Cutting-Edge Voice Cloning Technology&nbsp;★</span>
              <span>★&nbsp;Achieve Natural, Human-Like Voices&nbsp;★</span>
            </SubHeading>

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
            {/* Видео с пиздящим Димой */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/iy0mfAiQ3Zk?si=wrGr48AvlK5_eH-L"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
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
              <Heading type={1}>
                Seamlessly Translate Your Content into{" "}
                <span className="bg-gradient-to-br bg-clip-text text-transparent from-primary-400 to-primary-700">
                  {props.outputLanguageAmount - 1} Languages
                </span>
              </Heading>

              <SubHeading className="max-w-2xl">
                Make your audience captivated by listening to you in their mother tongue with just a
                couple of clicks
              </SubHeading>
            </div>
          </div>

          <div
            className="grid gap-2 lg:gap-4 w-full px-10"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
          >
            {props.languageTableLinks.map(({ language, link }) => (
              <Link
                key={link}
                href={link}
                className="hover:underline text-[20px] lg:text-[25px] p-2 lg:p-4"
              >
                {configuration.languageEmojis[language]}
                &nbsp;
                <span className="capitalize">{language}</span>
              </Link>
            ))}
          </div>

          <div className={"flex flex-col items-center space-y-4"}>
            <MainCallToActionButton />

            <span className={"text-xs text-gray-500 dark:text-gray-400"}>
              No credit card required
            </span>
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
}

export default Index;

//#region SSG

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { props } = await withTranslationProps({ locale });
  await initFlagsmith();
  const outputLanguageListFlagsmith: string = flagsmith.getValue(FEATURES_IDS_LIST.languages_list);
  const outputLanguageList: string[] = JSON.parse(outputLanguageListFlagsmith);

  // Ссылки на таблицы PSEO
  const inputLanguageListFlagsmith: string = flagsmith.getValue(
    FEATURES_IDS_LIST.requirements_info_tooltip,
  );
  const inputLanguageList: string[] = JSON.parse(inputLanguageListFlagsmith).supported_languages
    .for_source_file.languages_list;

  const languageTableLinks = inputLanguageList.map((language) => ({
    language: language.toLowerCase(),
    link: `/table/${language.toLowerCase()}`,
  }));

  return {
    props: {
      ...props,
      outputLanguageAmount: outputLanguageList.length,
      languageTableLinks,
    },
  };
}

//#endregion

//#region Components

export function HeroTitle({ children }: React.PropsWithChildren) {
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

export function Pill(props: React.PropsWithChildren) {
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

export function MainCallToActionButton() {
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
