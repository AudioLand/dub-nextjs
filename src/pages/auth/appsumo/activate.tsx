import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import configuration from "~/configuration";

import AppSumoEmailPasswordActivate from "~/components/auth/AppSumoEmailPasswordActivate";
import AppSumoActivatePageLayout from "~/components/auth/AppsumoActivatePageLayout";
import { withAuthProps } from "~/lib/props/with-auth-props";

const appHomePath = configuration.paths.appHome;

const Activate: React.FCC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    void router.prefetch(appHomePath);
  }, [router]);

  const onSubmit = useCallback(() => {
    return router.push(appHomePath);
  }, [router]);

  return (
    <AppSumoActivatePageLayout heading="Activate an account">
      <Head>
        <title key={"title"}>Activate an account</title>
      </Head>

      <AppSumoEmailPasswordActivate onSubmit={onSubmit} loading={false} email="test бля" />
    </AppSumoActivatePageLayout>
  );
};

export default Activate;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAuthProps(ctx);
}
