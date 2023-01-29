import React from "react";
import { HandleFilterType } from "./filters";

import { DateRangeFilter, CheckboxFilter } from "./filters";

import { Keys, HeaderRowType } from "../types";

const STATUS_OPTIONS = [
  "In-progress",
  "Inventory",
  "Assigned",
  "Incomplete",
  "Delivered",
  "checked_into_inventory"
];

const PICKUP_OPTIONS = ["Yes", "No"];

export function buildHeaderCells(
  options: { [key in Keys]: Set<string> }
): HeaderRowType {
  return {
    date: {
      label: "Date",
      filterContent: <DateRangeFilter />,
    },
    status: {
      label: "Status",
      filterContent: (
        <CheckboxFilter options={STATUS_OPTIONS} filterKey="status" />
      ),
    },
    firstParty: {
      label: "First Party",
      filterContent: (
        <CheckboxFilter
          options={[...options.firstParty]}
          filterKey="firstParty"
        />
      ),
    },
    consigneeName: {
      label: "Consignee Name",
      filterContent: (
        <CheckboxFilter
          options={[...options.consigneeName]}
          filterKey="consigneeName"
        />
      ),
    },
    consigneeAddress: {
      label: "Consignee Address",
      filterContent: (
        <CheckboxFilter
          options={[...options.consigneeAddress]}
          filterKey="consigneeAddress"
        />
      ),
    },
    lastAssigned: {
      label: "Last Assigned Driver",
      filterContent: (
        <CheckboxFilter
          options={[...options.lastAssigned]}
          filterKey="lastAssigned"
        />
      ),
    },
    barcodeNumber: {
      label: "Barcode",
      filterContent: (
        <CheckboxFilter
          options={[...options.barcodeNumber]}
          filterKey="barcodeNumber"
        />
      ),
    },
    shipper: {
      label: "Shipper",
      filterContent: (
        <CheckboxFilter options={[...options.shipper]} filterKey="shipper" />
      ),
    },
    pickup: {
      label: "Pickup",
      filterContent: (
        <CheckboxFilter options={PICKUP_OPTIONS} filterKey="pickup" />
      ),
    },
    ticketId: {
      label: "",
    },
  };
}
