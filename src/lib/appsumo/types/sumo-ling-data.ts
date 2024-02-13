export interface AppSumoReqData {
  planId: string;
  uuid: string;
  activationEmail: string;
  invoiceItemUUID: string;
}

export interface SumolingData {
  planId: string;
  uuid: string;
  activationEmail: string;
}

export interface SumolingInvoice {
  planId: string;
  uuid: string;
  invoiceItemUUID: string;
  timestamp: UnixTimestamp;
}
