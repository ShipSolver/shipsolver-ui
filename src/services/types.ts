export type User = {
  NAME: string;
  EMAIL: string;
  PHONE?: string;
  BROKER?: boolean;
};

export type Ticket = {
  STATUS: string;
  FIRST_PARTY: string;
  HOUSE_REF: string;
  BARCODE: string;
  PCS: [
    {
      DESCRIPTION: string;
    }
  ];
  NUM_PCS: string;
  WEIGHT: string;
  BOL_NUM: string;
  SPECIAL_SERVICES: string;
  SPECIAL_INSTRUCTIONS: string;
  CURRENT_ASSIGNED_USER_ID: string;
  NO_SIGNATURE_REQUIRED: boolean;
  TAILGATE_AUTHORIZED: boolean;
  IS_PICKUP: boolean;
  APPOINTMENT_TIME: string;
  CONSIGNEE: {
    COMPANY: string;
    NAME: string;
    ADDRESS: string;
    CITY: string;
    PROVINCE: string;
    POSTAL_CODE: string;
    PHONE_NUMBER: string;
  };
  SHIPPER: {
    COMPANY: string;
    NAME: string;
    ADDRESS: string;
    CITY: string;
    PROVINCE: string;
    POSTAL_CODE: string;
    PHONE_NUMBER: string;
  };
  MILESTONES: [
    {
      TIMESTAMP: string;
      DESCRIPTION: string;
    }
  ];
  EDITS: [
    {
      TIMESTAMP: string;
      USERNAME: string;
      CHANGES_MADE: [
        {
          FIELD_TYPE: string;
          ORIGINAL_VALUE: string;
          NEW_VALUE: string;
        }
      ];
    }
  ];
};

export type Broker = {
  NAME: string;
  EMAIL: string;
  PHONE: string;
};
