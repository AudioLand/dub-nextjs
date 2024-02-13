import If from "~/core/ui/If";
import MobileNavigationDropdown from "~/core/ui/MobileNavigationMenu";
import NavigationItem from "~/core/ui/Navigation/NavigationItem";
import NavigationMenu from "~/core/ui/Navigation/NavigationMenu";
import { useIsSumolingUser } from "~/lib/appsumo/hooks/is-sumo-ling-user";

const links = {
  General: {
    path: "/settings/profile",
    label: "profile:generalTab",
  },
  Authentication: {
    path: "/settings/profile/authentication",
    label: "profile:authenticationTab",
  },
  Email: {
    path: "/settings/profile/email",
    label: "profile:emailTab",
  },
  Password: {
    path: "/settings/profile/password",
    label: "profile:passwordTab",
  },
};

const ProfileSettingsTabs = () => {
  const isSumolingUser = useIsSumolingUser();
  const itemClassName = `flex justify-center lg:justify-start items-center w-full`;

  return (
    <>
      <div className={"hidden w-[12rem] lg:flex"}>
        <NavigationMenu vertical pill>
          <NavigationItem className={itemClassName} link={links.General} depth={0} />

          <If condition={!isSumolingUser}>
            <NavigationItem className={itemClassName} link={links.Authentication} />

            <NavigationItem className={itemClassName} link={links.Email} />
          </If>

          <NavigationItem className={itemClassName} link={links.Password} />
        </NavigationMenu>
      </div>

      <div className={"block w-full lg:hidden"}>
        <MobileNavigationDropdown links={Object.values(links)} />
      </div>
    </>
  );
};

export default ProfileSettingsTabs;
