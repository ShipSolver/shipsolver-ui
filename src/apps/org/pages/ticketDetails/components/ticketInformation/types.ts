export type SectionTypes = "shipper" | "shipmentDetails" | "consignee";

export const ShipperFieldLabels = {
  company: "Company",
  name: "Name",
  address: "Address",
  phoneNum: "Phone Number",
  postalCode: "Postal Code",
};

export const ShipmentDetailsFieldLabels = {
  refNum: "House/Ref #",
  barcode: "Barcode",
  weight: "Weight",
  bolNum: "BOL #",
  specialInst: "Special Instructions",
};

export const ConsigneeFieldLabels = {
  company: "Company",
  name: "Name",
  address: "Address",
  phoneNum: "Phone Number",
  postalCode: "Postal Code",
};

export type ShipperFields = keyof typeof ShipperFieldLabels;
export type ShipmentDetailsFields = keyof typeof ShipmentDetailsFieldLabels;
export type ConsigneeFields = keyof typeof ConsigneeFieldLabels;

export type TicketInformationStateType = {
  firstParty?: string;
  shipper: {
    [key in ShipperFields]: string;
  };
  shipmentDetails: {
    [key in ShipmentDetailsFields]: string | number;
  };
  consignee: {
    [key in ConsigneeFields]: string;
  };
  isPickup: boolean;
  noSignatureRequired?: boolean;
  tailgateAuthorized?: boolean;
  id?: string;
  podUrls?: string[];
  customerSignatureUrls?: string[];
  pictureUrls?: string[];
  deliveryReceiptS3Path?: string;
  deliveryRecieptLink?: string;
  ticketId?: number;
};

export type TicketInformationValidationType = {
    firstParty?: string;
    shipper?: {
      [key in ShipperFields]?: string;
    };
    shipmentDetails?: {
      [key in ShipmentDetailsFields]?: string;
    };
    consignee?: {
      [key in ConsigneeFields]?: string;
    };
}

export interface TicketType extends TicketInformationStateType {
  pieces?: string;
}


export const EMPTY_DATA: TicketInformationStateType = {
    shipper: Object.keys(ShipperFieldLabels).reduce(
      (acc, val) => ({...acc, [val]: "" }),
      {}
    ) as {
      [key in ShipperFields]: string;
    },
    shipmentDetails: Object.keys(ShipmentDetailsFieldLabels).reduce(
      (acc, val) => ({...acc, [val]: "" }),
      {}
    ) as {
      [key in ShipmentDetailsFields]: string | number;
    },
    consignee: Object.keys(ConsigneeFieldLabels).reduce(
      (acc, val) => ({...acc, [val]: "" }),
      {}
    ) as {
      [key in ConsigneeFields]: string;
    },
    isPickup: false,
    noSignatureRequired: false,
    tailgateAuthorized: false,
  };