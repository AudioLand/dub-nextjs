import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import configuration from "~/configuration";

import AppSumoEmailPasswordActivateContainer from "~/components/auth/AppSumoEmailPasswordActivateContainer";
import AppSumoActivatePageLayout from "~/components/auth/AppsumoActivatePageLayout";
import { withAuthProps } from "~/lib/props/with-auth-props";

const subscriptionPath = configuration.paths.settings.subscription;

const Activate: React.FCC = () => {
  const router = useRouter();

  useEffect(() => {
    void router.prefetch(subscriptionPath);
  }, [router]);

  const onSumbit = useCallback(() => {
    return router.push(subscriptionPath);
  }, [router]);

  return (
    <AppSumoActivatePageLayout heading="Activate an account">
      <Head>
        <title key={"title"}>Activate an account</title>
      </Head>

      <AppSumoEmailPasswordActivateContainer onSumbit={onSumbit} />
    </AppSumoActivatePageLayout>
  );
};

export default Activate;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAuthProps(ctx);
}
