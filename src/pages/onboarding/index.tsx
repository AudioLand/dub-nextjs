import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import configuration from "~/configuration";
import { withUserProps } from "~/lib/props/with-user-props";

import Layout from "~/core/ui/Layout";
import Logo from "~/core/ui/Logo";

import { CompleteOnboardingStep } from "~/components/onboarding/CompleteOnboardingStep";
import { withTranslationProps } from "~/lib/props/with-translation-props";

const appHome = configuration.paths.appHome;

//TODO: удалить эту страницу и весь связанный код, проверить, что она ни на что не влияет
const Onboarding = () => {
  // const [currentStep, setCurrentStep] = useState(0);
  // const [data, setData] = useState<Data>();
  const router = useRouter();

  // const onFirstStepSubmitted = useCallback(
  //   (organizationInfo: OrganizationInfoStepData) => {
  //     setData({
  //       // organization: organizationInfo.organization,
  //       organization: "",
  //     } as Data);

  //     setCurrentStep(1);
  //   },
  //   [],
  // );

  // prefetch application home route
  useEffect(() => {
    void router.prefetch(appHome);
  }, [router]);

  const onComplete = useCallback(() => {
    void router.push(appHome);
  }, [router]);

  return (
    <Layout>
      <Head>
        <title key="title">Onboarding</title>
      </Head>

      <div
        className={
          "flex h-screen flex-1 flex-col items-center justify-center" + " w-full space-y-24"
        }
      >
        <Logo href={"/onboarding"} />

        <div className={"w-full flex flex-col max-w-xl"}>
          {/* https://makerkit.dev/recipes/removing-organizations */}
          {/* <If condition={currentStep === 0}>
            <OrganizationInfoStep onSubmit={onFirstStepSubmitted} />
          </If>

          <If condition={currentStep === 1 && data}>
            {(data) => <CompleteOnboardingStep data={data} onComplete={onComplete} />}
          </If> */}

          <CompleteOnboardingStep data={{ organization: "Organization" }} onComplete={onComplete} />
        </div>
      </div>
    </Layout>
  );
};

export default Onboarding;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { props } = await withUserProps(ctx);
  const user = props.session;

  if (!user) {
    return redirectToSignIn();
  }

  const isEmailVerified = user.emailVerified;
  const requireEmailVerification = configuration.auth.requireEmailVerification;

  if (requireEmailVerification && !isEmailVerified) {
    return redirectToSignIn();
  }

  const userData = await getUserData(user.uid);
  const translationProps = await withTranslationProps(ctx);

  // if we cannot find the user's Firestore record
  // the user should go to the onboarding flow
  // so that the record wil be created after the end of the flow
  if (!userData) {
    return {
      ...translationProps,
      props,
    };
  }

  const { getCurrentOrganization } = await import(
    "~/lib/server/organizations/get-current-organization"
  );

  const organization = await getCurrentOrganization(user.uid);
  const { onboarded } = user.customClaims;

  if (onboarded && organization) {
    return redirectToAppHome(ctx.locale);
  }

  return {
    ...translationProps,
    props,
  };
}

function redirectToSignIn() {
  const paths = configuration.paths;

  const destination = [paths.signIn, `?returnUrl=${paths.onboarding}&signOut=true`].join("/");

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}

function redirectToAppHome(locale: string | undefined) {
  const localePrefix = locale ? `/${locale}` : "";
  const destination = `${localePrefix}${configuration.paths.appHome}`;

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}

/**
 * @name getUserData
 * @description Fetch User Firestore data decorated with its ID field
 * @param userId
 */
async function getUserData(userId: string) {
  const { getUserRefById } = await import("~/lib/server/queries");

  const ref = await getUserRefById(userId);
  const data = ref.data();

  if (data) {
    return {
      ...data,
      id: ref.id,
    };
  }
}
