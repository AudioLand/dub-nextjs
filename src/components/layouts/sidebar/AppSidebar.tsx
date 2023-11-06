import { useContext } from "react";
import TokensInfoCard from "~/components/subscriptions/TokensInfoCard";
import { SidebarContext } from "~/core/contexts/sidebar";
import If from "~/core/ui/If";
import Sidebar from "~/core/ui/Sidebar";
import AppSidebarNavigation from "./AppSidebarNavigation";

const AppSidebar = () => {
  const { collapsed } = useContext(SidebarContext);

  return (
    <Sidebar>
      <AppSidebarNavigation />
      <If condition={!collapsed}>
        <div className="absolute inset-x-4 bottom-48 h-16">
          <TokensInfoCard />
        </div>
      </If>
    </Sidebar>
  );
};

export default AppSidebar;
