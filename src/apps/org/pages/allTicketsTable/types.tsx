export const KEYS_BASE = [
  "date",
  "status",
  "firstParty",
  "consigneeName",
  "consigneeAddress",
  "lastAssigned",
  "barcodeNumber",
  "shipper",
  "pickup",
  "ticketId"
] as const;

export type Keys = typeof KEYS_BASE[number];

export type HeaderRowDataType = {
  label: string;
  filterLabel?: string;
  filterContent?: React.ReactElement;
};

export type HeaderRowType = {
  [key in Keys]: HeaderRowDataType;
};

export type RowType = {
  [key in Keys]: string | number;
};
