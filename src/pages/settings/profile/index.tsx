import { UserInfo } from "firebase/auth";
import { GetServerSidePropsContext } from "next";
import { Trans } from "next-i18next";
import { useCallback, useContext } from "react";
import { useUser } from "reactfire";

import { UserSessionContext } from "~/core/contexts/user-session";
import { withAppProps } from "~/lib/props/with-app-props";

import Head from "next/head";
import ProfileSettingsTabs from "~/components/profile/ProfileSettingsTabs";
import UpdateProfileForm from "~/components/profile/UpdateProfileForm";
import SettingsContentContainer from "~/components/settings/SettingsContentContainer";
import SettingsPageContainer from "~/components/settings/SettingsPageContainer";
import SettingsTile from "~/components/settings/SettingsTile";
import FirebaseStorageProvider from "~/core/firebase/components/FirebaseStorageProvider";

type ProfileData = Partial<UserInfo>;

const Profile = () => {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const { data: user } = useUser();

  const onUpdate = useCallback(
    (data: ProfileData) => {
      const authData = userSession?.auth;

      if (authData) {
        setUserSession({
          auth: {
            ...authData,
            ...data,
          },
          data: userSession.data,
        });
      }
    },
    [setUserSession, userSession],
  );

  if (!user) {
    return null;
  }

  return (
    <FirebaseStorageProvider>
      <SettingsPageContainer title={"Settings"}>
        <Head>
          <title key={"title"}>My Details</title>
        </Head>

        <ProfileSettingsTabs />

        <SettingsContentContainer>
          <SettingsTile
            heading={<Trans i18nKey={"profile:generalTab"} />}
            subHeading={<Trans i18nKey={"profile:generalTabSubheading"} />}
          >
            <UpdateProfileForm user={user} onUpdate={onUpdate} />
          </SettingsTile>
        </SettingsContentContainer>
      </SettingsPageContainer>
    </FirebaseStorageProvider>
  );
};

export default Profile;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
