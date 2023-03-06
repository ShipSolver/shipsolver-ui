import React, { useState } from "react";
import {
  TicketInformationValidationType,
  ShipperFields,
  TicketInformationStateType,
  ConsigneeFields,
  ShipmentDetailsFields,
  SectionTypes,
} from "../types";

const phoneNumberRegex = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
);

const postalCodeRegex = new RegExp(
  /^((\d{5}-\d{4})|(\d{5})|([A-Z|a-z]\d[A-Z|a-z]\d[A-Z|a-z]\d))$/
);

export function useValidation() {
  const [errors, setErrors] = useState<TicketInformationValidationType>({});
  function validateShipperData(
    shipper: {
      [key in ShipperFields]?: string;
    }
  ) {
    let numErrors = 0;

    // Valdiate phone number
    if (shipper.phoneNum && !phoneNumberRegex.test(shipper.phoneNum)) {
      setErrors((prev) => ({
        ...prev,
        shipper: {
          ...prev.shipper,
          phoneNum: "Please enter a valid phone number",
        },
      }));
      numErrors++;
    }

    // Validate postal code
    if (shipper.postalCode && !postalCodeRegex.test(shipper.postalCode)) {
      setErrors((prev) => ({
        ...prev,
        shipper: {
          ...prev.shipper,
          postalCode: "Please enter a valid postal code (no spaces)",
        },
      }));
      numErrors++;
    }

    return numErrors;
  }

  function validateConsigneeData(
    consignee: {
      [key in ConsigneeFields]?: string;
    }
  ) {
    let numErrors = 0;

    // Valdiate phone number
    if (consignee.phoneNum && !phoneNumberRegex.test(consignee.phoneNum)) {
      setErrors((prev) => ({
        ...prev,
        consignee: {
          ...prev.consignee,
          phoneNum: "Please enter a valid phone number",
        },
      }));
      numErrors++;
    }

    // Validate postal code
    if (consignee.postalCode && !postalCodeRegex.test(consignee.postalCode)) {
      setErrors((prev) => ({
        ...prev,
        consignee: {
          ...prev.consignee,
          postalCode: "Please enter a valid postal code (no spaces)",
        },
      }));
      numErrors++;
    }

    return numErrors;
  }

  function validateShipmentDetailsData(
    shipmentDetails: {
      [key in ShipmentDetailsFields]?: string | number;
    }
  ) {
    const numErrors = 0;

    // Make sure value is present
    for (let [key, val] of Object.entries(shipmentDetails)) {
      if (key !== "specialInst" && isNaN(+val)) {
        setErrors((prev) => ({
          ...prev,
          shipmentDetails: {
            ...prev.shipmentDetails,
            [key]: "Please enter a valid number",
          },
        }));
        numErrors++;
      }
    }

    return numErrors;
  }

  function clearError(parentKey: SectionTypes, childKey?: string) {
    if (childKey) {
      setErrors((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: undefined,
        },
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [parentKey]: undefined,
      }));
    }
  }

  const validate = (data: TicketInformationStateType) => {
    return (
      validateShipperData(data.shipper) +
      validateConsigneeData(data.consignee) +
      validateShipmentDetailsData(data.shipmentDetails)
    );
  };

  return { errors, validate, clearError };
}
