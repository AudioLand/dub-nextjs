import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import configuration from "~/configuration";

import AppSumoEmailPasswordActivateContainer from "~/components/auth/appsumo/AppSumoEmailPasswordActivateContainer";
import AppSumoActivatePageLayout from "~/components/auth/appsumo/AppsumoActivatePageLayout";
import { withAuthProps } from "~/lib/props/with-auth-props";

const subscriptionPathWithSource = `${configuration.paths.settings.subscription}?source=appsumo`;

const Activate: React.FCC = () => {
  const router = useRouter();

  useEffect(() => {
    void router.prefetch(subscriptionPathWithSource);
  }, [router]);

  const onSubmit = useCallback(() => {
    return router.push(subscriptionPathWithSource);
  }, [router]);

  return (
    <AppSumoActivatePageLayout heading="Activate an account">
      <Head>
        <title key={"title"}>Activate an account</title>
      </Head>

      <AppSumoEmailPasswordActivateContainer onSubmit={onSubmit} />
    </AppSumoActivatePageLayout>
  );
};
export default Activate;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAuthProps(ctx);
}
