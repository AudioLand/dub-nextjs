import { getSumolingOrganizationRefByUUID } from "./get-sumo-ling-organization-ref-by-uuid";

export const updateInvoiceItemUUID = async (uuid: string, invoiceItemUUID: string) => {
  const organization = await getSumolingOrganizationRefByUUID(uuid);

  return organization.update({
    invoiceItemUUID,
  });
};
