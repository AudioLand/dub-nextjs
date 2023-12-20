import React from "react";
import type { GetStaticPropsContext, GetStaticPathsContext } from "next";
import flagsmith from "flagsmith";
import Head from "next/head";
import Link from "next/link";

import initFlagsmith from "~/core/flagsmith/hooks/init-flagsmith";
import Container from "~/core/ui/Container";
import Heading from "~/core/ui/Heading";
import Layout from "~/core/ui/Layout";
import SiteHeader from "~/components/SiteHeader";
import { withTranslationProps } from "~/lib/props/with-translation-props";
import Footer from "~/components/Footer";
import FEATURES_IDS_LIST from "~/core/flagsmith/features-ids-list";
import configuration from "~/configuration";
import { pairPathPrefix } from "../[language]";

type LanguagePairProps = {
  languageFrom: string;
  outputLanguages: string[];
};

function LanguagePair({ languageFrom, outputLanguages }: LanguagePairProps) {
  return (
    <Layout>
      <Head>
        <title>{`Online Audio and Video Dubbing from ${languageFrom} to ${
          outputLanguages.length - 1
        } languages`}</title>
        <meta
          name="description"
          content={`Welcome to Audioland premier online dubbing service for translating your ${languageFrom} audio and video content into ${
            outputLanguages.length - 1
          } languages. Our specialized service is meticulously crafted to cater to diverse requirements, ranging from professional business presentations and educational materials to captivating entertainment media and personal projects.`}
        />
      </Head>

      <SiteHeader />

      <Container>
        <div className={"flex flex-col items-center justify-center py-[100px]"}>
          <Heading type={3}>
            <span className="capitalize font-heading text-4xl font-semibold tracking-tight">
              Translate {languageFrom} To{" "}
              <span className="bg-gradient-to-br bg-clip-text text-transparent from-primary-400 to-primary-700">
                {outputLanguages?.length - 1 ?? 0} Languages
              </span>
            </span>
          </Heading>
          <div
            className="grid gap-2 lg:gap-4 w-full p-10"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
          >
            {outputLanguages
              ?.filter((x) => ![languageFrom].includes(x))
              .map((x) => (
                <Link
                  key={x}
                  href={`/${pairPathPrefix}${languageFrom}-to-${x}`}
                  className="hover:underline text-[20px] lg:text-[25px] p-2 lg:p-4"
                >
                  {configuration.languageEmojis[x as keyof typeof configuration.languageEmojis]}
                  &nbsp;
                  <span className="capitalize">{x}</span>
                </Link>
              ))}
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
}

export default LanguagePair;

//#region ISR

const pseoPathPattern = new RegExp(`([a-zA-Z]+)$`);

export async function getStaticProps({ locale, params }: GetStaticPropsContext) {
  if (!params || !params.language || !(params.language as string).match(pseoPathPattern)) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  const languageFrom = params.language as string;

  await initFlagsmith();
  const outputLanguageListFlagsmith: string = flagsmith.getValue(FEATURES_IDS_LIST.languages_list);
  const outputLanguageList: string[] = JSON.parse(outputLanguageListFlagsmith);

  const { props } = await withTranslationProps({ locale });

  return {
    props: {
      ...props,
      languageFrom: languageFrom,
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

  return {
    paths: inputLanguageList.map((language) => ({ params: { language: language.toLowerCase() } })),
    fallback: true, // false or "blocking"
  };
}

//#endregion
