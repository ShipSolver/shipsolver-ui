export type User = {
  name: string;
  email: string;
  phone?: string;
};

export type Ticket = {
  FIRST_PARTY: string;
  HOUSE_REF: string;
  BARCODE: string;
  PCS: [];
  NUM_PCS: string;
  WEIGHT: string;
  BOL_NUM: string;
  SPECIAL_SERVICES: string;
  SPECIAL_INSTRUCTIONS: string;
  CONSIGNEE: {
    COMPANY: string;
    NAME: string;
    ADDRESS: string;
    POSTAL_CODE: string;
    PHONE_NUMBER: string;
  };
  SHIPPER: {
    COMPANY: string;
    NAME: string;
    ADDRESS: string;
    POSTAL_CODE: string;
    PHONE_NUMBER: string;
  };
};
