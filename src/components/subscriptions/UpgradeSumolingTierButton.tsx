import Button from "~/core/ui/Button";
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";

function UpgradeSumolingTierButton() {
  const organization = useCurrentOrganization();
  const subscription = organization?.subscription;
  const invoiceItemUUID = organization?.invoiceItemUUID;

  const handleUpgradeClick = () => {
    window.location.href = `https://appsumo.com/account/redemption/${invoiceItemUUID}#change-plan`;
  };

  // if the organization has not an active subscription
  if (subscription?.status !== "active") {
    return null;
  }

  // in all other cases we show the upgrade tier button
  return (
    <Button className={"mt-3"} block onClick={handleUpgradeClick}>
      Upgrade your AppSumo Plan
    </Button>
  );
}

export default UpgradeSumolingTierButton;
