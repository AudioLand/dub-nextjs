import { useContext } from "react";
import TokensInfoCard from "~/components/subscriptions/TokensInfoCard";
import { SidebarContext } from "~/core/contexts/sidebar";
import If from "~/core/ui/If";
import Sidebar from "~/core/ui/Sidebar";
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";
import AppSidebarNavigation from "./AppSidebarNavigation";

const AppSidebar = () => {
  const { collapsed } = useContext(SidebarContext);

  // User's organization constains used tokens
  // Unless user org is not loaded => TokensInfoCard throw error
  // So we need wait until user org will loaded
  const userOrganization = useCurrentOrganization();

  const showTokensInfoCard = userOrganization !== undefined && !collapsed;

  return (
    <Sidebar>
      <AppSidebarNavigation />
      <If condition={showTokensInfoCard}>
        <div className="absolute inset-x-4 bottom-48 h-16">
          <TokensInfoCard />
        </div>
      </If>
    </Sidebar>
  );
};

export default AppSidebar;
