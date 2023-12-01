import type { GetStaticPropsContext, GetStaticPathsContext } from "next";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import flagsmith from "flagsmith";
import Head from "next/head";
import Link from "next/link";

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
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";

type LanguagePairProps = {
  languageFrom: string;
  languageTo: string;
  outputLanguages: string[];
};

function LanguagePair({ languageFrom, languageTo, outputLanguages }: LanguagePairProps) {
  return (
    <Layout>
      <Head>
        <title>{`Online Audio and Video Dubbing from ${languageFrom} to ${languageTo}`}</title>
        <meta
          name="description"
          content={`Welcome to Audioland premier online dubbing service for translating your ${languageFrom} audio and video content into ${languageTo}. Our specialized service is meticulously crafted to cater to diverse requirements, ranging from professional business presentations and educational materials to captivating entertainment media and personal projects.`}
        />
      </Head>

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
              Online Audio and Video Dubbing from {languageFrom} to {languageTo}
            </HeroTitle>
            <SubHeading className={"text-center"}>
              <span
                className={
                  "bg-gradient-to-br bg-clip-text text-transparent" +
                  " from-primary-400 to-primary-700 leading-[1.2]"
                }
              >
                Our Translation technology can dub any {languageFrom} video and audio into{" "}
                {languageTo}.
              </span>
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
            <Heading type={2}>
              <span className="font-heading text-4xl font-semibold tracking-tight">
                How to translate {languageFrom} video or audio to {languageTo}?
              </span>
            </Heading>
            <ol className={"list-decimal max-w-2xl mx-auto !mt-10"}>
              <li className="text-left mb-4">
                <Heading type={3}>
                  <span className="font-extrabold">Upload your file</span>
                </Heading>
                <span>Upload your {languageFrom} video or audio in the dashboard</span>
              </li>
              <li className="text-left mb-4">
                <Heading type={3}>
                  <span className="font-extrabold">
                    Select languages from {languageFrom} to {languageTo}
                  </span>
                </Heading>
                <span>
                  From the dropdown menu, choose Source and Target languages i.e., {languageFrom}{" "}
                  video translation to {languageTo}
                </span>
              </li>
              <li className="text-left mb-4">
                <Heading type={3}>
                  <span className="font-extrabold">Click Create button</span>
                </Heading>
                <span>
                  Wait for the magic to happen, you will see Transcripts, Translations, Audio and
                  Video Dubbing of {languageFrom} and {languageTo}
                </span>
              </li>
            </ol>
          </SubHeading>
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-16 space-y-16 text-center"}>
          <Heading type={1}>Look at What our Users say about Audioland Dubbing service</Heading>
          <FeedbackList />
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-16 space-y-16"}>
          <div className={"flex flex-col items-center space-y-8 text-center"}>
            <p>
              TODO: Вывести три смэпла голосов таргет языка из базы. Нужно решить по какому правилу
              выводить, можно из “рекомендованных” выбирать первые три. Тогда у нас наиболее
              качественные будут показываться всегда
            </p>
            <MainCallToActionButton />
          </div>
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-[100px]"}>
          <Heading type={3}>
            <span className="capitalize font-heading text-4xl font-semibold tracking-tight">
              Translate {languageFrom} To{" "}
              <span className="bg-gradient-to-br bg-clip-text text-transparent from-primary-400 to-primary-700">
                {outputLanguages.length - 1} Languages
              </span>
            </span>
          </Heading>
          <div
            className="grid gap-2 lg:gap-4 w-full p-10"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
          >
            {outputLanguages
              .filter((x) => ![languageFrom, languageTo].includes(x))
              .map((x) => (
                <Link
                  key={x}
                  href={`/${pathPrefix}${languageFrom}-to-${x}`}
                  className="hover:underline text-[25px] lg:text-[30px] p-2 lg:p-4"
                >
                  {languageEmojis[x as keyof typeof languageEmojis]}&nbsp;
                  <span className="capitalize">{x}</span>
                </Link>
              ))}
          </div>
        </div>
      </Container>

      <Container>
        <div className={"flex flex-col items-center justify-center py-16 space-y-16"}>
          <div
            className={"space-y-8 font-heading text-4xl font-semibold tracking-tight text-center"}
          >
            Create your first Audio or Video translation from {languageFrom} to {languageTo} right
            now!
          </div>
          <MainCallToActionButton />
        </div>
      </Container>

      <Footer />
    </Layout>
  );
}

export default LanguagePair;

//#region ISR

const pathPrefix = "online-audio-video-dubbing-";

export async function getStaticProps({ locale, params }: GetStaticPropsContext) {
  await initFlagsmith();
  const outputLanguageListFlagsmith: string = flagsmith.getValue(FEATURES_IDS_LIST.languages_list);
  const outputLanguageList: string[] = JSON.parse(outputLanguageListFlagsmith);

  const { props } = await withTranslationProps({ locale });
  const seoLanguagePair = (params?.language as string)?.slice(pathPrefix.length).split("-to-");
  return {
    props: {
      ...props,
      languageFrom: seoLanguagePair[0],
      languageTo: seoLanguagePair[1],
      outputLanguages: outputLanguageList.map((x) => x.toLowerCase()),
    } satisfies LanguagePairProps,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 day
    revalidate: 60 * 60 * 24,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  await initFlagsmith();
  const inputLanguageListFlagsmith: string = flagsmith.getValue(
    FEATURES_IDS_LIST.requirements_info_tooltip,
  );
  const inputLanguageList: string[] = JSON.parse(inputLanguageListFlagsmith).supported_languages
    .for_source_file.languages_list;

  const outputLanguageListFlagsmith: string = flagsmith.getValue(FEATURES_IDS_LIST.languages_list);
  const outputLanguageList = JSON.parse(outputLanguageListFlagsmith);

  // languageList -> pairs
  let languagePaths: string[] = [];
  for (let i = 0; i < inputLanguageList.length; i++) {
    for (let o = 0; o < outputLanguageList.length; o++) {
      const from = inputLanguageList[i].toLowerCase();
      const to = outputLanguageList[o].toLowerCase();
      if (from === to) continue;
      languagePaths.push(`${pathPrefix}${from}-to-${to}`);
    }
  }
  return {
    paths: languagePaths.map((language) => ({ params: { language } })),
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
        <span>Try for free dub</span>
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

const languageEmojis = {
  english: "🇬🇧",
  spanish: "🇪🇸",
  estonian: "🇪🇪",
  thai: "🇹🇭",
  zulu: "🇿🇦",
  korean: "🇰🇷",
  bangla: "🇧🇩",
  portuguese: "🇵🇹",
  hebrew: "🇮🇱",
  catalan: "🇨🇦",
  kannada: "🇮🇳",
  chinese: "🇨🇳",
  javanese: "🇮🇩",
  tamil: "🇮🇳",
  sundanese: "🇮🇩",
  german: "🇩🇪",
  swedish: "🇸🇪",
  malayalam: "🇮🇳",
  arabic: "🇸🇦",
  french: "🇫🇷",
  vietnamese: "🇻🇳",
  croatian: "🇭🇷",
  danish: "🇩🇰",
  finnish: "🇫🇮",
  russian: "🇷🇺",
  hindi: "🇮🇳",
  polish: "🇵🇱",
  turkish: "🇹🇷",
  japanese: "🇯🇵",
  norwegian: "🇳🇴",
  italian: "🇮🇹",
  greek: "🇬🇷",
  bulgarian: "🇧🇬",
  czech: "🇨🇿",
  slovak: "🇸🇰",
  latvian: "🇱🇻",
  romanian: "🇷🇴",
  slovene: "🇸🇮",
  ukrainian: "🇺🇦",
  lithuanian: "🇱🇹",
  dutch: "🇳🇱",
  bahasa: "🇮🇩",
  malay: "🇲🇾",
  gujarati: "🇮🇳",
  telugu: "🇮🇳",
  marathi: "🇮🇳",
  swahili: "🇰🇪",
  urdu: "🇵🇰",
  welsh: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  hungarian: "🇭🇺",
  irish: "🇮🇪",
  persian: "🇮🇷",
  afrikaans: "🇿🇦",
  filipino: "🇵🇭",
};

//#endregion
