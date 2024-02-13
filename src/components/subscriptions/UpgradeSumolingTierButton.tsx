import { useRouter } from "next/router";
import Button from "~/core/ui/Button";
import { useFetchSumolingLastInvoiceItemByUUID } from "~/lib/appsumo/hooks/use-fetch-sumoling-last-invoice-item-by-uuid";
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";

function UpgradeSumolingTierButton() {
  const router = useRouter();
  const organization = useCurrentOrganization()!;
  const subscription = organization.subscription;

  const sumolingUUID = organization.sumolingUUID!;
  const sumolingInvoice = useFetchSumolingLastInvoiceItemByUUID(sumolingUUID);
  const invoiceItemUUID = sumolingInvoice?.invoiceItemUUID;

  // if the organization has not an active subscription
  if (!subscription || subscription.status !== "active" || !invoiceItemUUID) {
    return null;
  }

  const handleUpgradeClick = () => {
    router.push(`https://appsumo.com/account/redemption/${invoiceItemUUID}#change-plan`);
  };

  // in all other cases we show the upgrade tier button
  return (
    <Button className={"mt-3"} block onClick={handleUpgradeClick}>
      Upgrade your AppSumo Plan
    </Button>
  );
}

export default UpgradeSumolingTierButton;
