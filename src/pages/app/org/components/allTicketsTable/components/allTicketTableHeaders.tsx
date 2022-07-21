import React from "react";
import { HandleFilterType } from "./filters";

import { DateRangeFilter, CheckboxFilter } from "./filters";
import { fetchAllDrivers } from "../../../../../../services/driverServices";

import { HeaderRowType } from "./ticketTable";
import { AllTicketsTableRows } from "../";

const STATUS_OPTIONS = [
  "In-progress",
  "Inventory",
  "Assigned",
  "Incomplete",
  "Delivered",
];

const PICKUP_OPTIONS = ["Yes", "No"];

export type Keys =
  | "date"
  | "status"
  | "firstParty"
  | "consigneeName"
  | "consigneeAddress"
  | "lastAssigned"
  | "barcodeNumber"
  | "shipper"
  | "pickup";

const getUnique = async (rowData: AllTicketsTableRows[], filter: Keys) => {
  const unique: { [key: string]: boolean } = {};

  rowData.forEach((row) => {
    if (!unique[row[filter]]) {
      unique[row[filter]] = true;
    }
  });

  return Object.keys(unique).sort((a, b) => a.localeCompare(b));
};

export const createAllTicketTableHeaders = async (
  handleFilter: HandleFilterType,
  rowData: AllTicketsTableRows[]
): Promise<[string[], HeaderRowType<Keys>]> => {
  const [
    FIRST_PARTY_OPTIONS,
    CONSIGNEE_NAMES_OPTIONS,
    CONSIGNEE_ADDRESSES_OPTIONS,
    SHIPPER_NAMES_OPTIONS,
    DRIVER_NAMES_OPTIONS,
  ] = await Promise.all([
    getUnique(rowData, "firstParty"),
    getUnique(rowData, "consigneeName"),
    getUnique(rowData, "consigneeAddress"),
    getUnique(rowData, "shipper"),
    fetchAllDrivers(),
  ]);

  return [
    DRIVER_NAMES_OPTIONS,
    {
      date: {
        label: "Date",
        filterLabel: "Filter Date range",
        filterContent: <DateRangeFilter handleFilter={handleFilter} />,
      },
      status: {
        label: "Status",
        filterLabel: "Filter Status type",
        filterContent: (
          <CheckboxFilter
            handleFilter={handleFilter}
            options={STATUS_OPTIONS}
            filterKey="status"
          />
        ),
      },
      firstParty: {
        label: "First Party",
        filterLabel: "Filter First Party",
        filterContent: (
          <CheckboxFilter
            handleFilter={handleFilter}
            options={FIRST_PARTY_OPTIONS}
            filterKey="firstParty"
          />
        ),
      },
      consigneeName: {
        label: "Consignee Name",
        filterLabel: "Filter Consignee Names",
        filterContent: (
          <CheckboxFilter
            handleFilter={handleFilter}
            options={CONSIGNEE_NAMES_OPTIONS}
            filterKey="consigneeName"
          />
        ),
      },
      consigneeAddress: {
        label: "Consignee Address",
        filterLabel: "Filter Consignee Addresses",
        filterContent: (
          <CheckboxFilter
            handleFilter={handleFilter}
            options={CONSIGNEE_ADDRESSES_OPTIONS}
            filterKey="consigneeAddress"
          />
        ),
      },
      lastAssigned: {
        label: "Last Assigned Driver",
        filterLabel: "Filter Driver",
        filterContent: (
          <CheckboxFilter
            handleFilter={handleFilter}
            options={DRIVER_NAMES_OPTIONS}
            filterKey="lastAssigned"
          />
        ),
      },
      barcodeNumber: {
        label: "Barcode",
      },
      shipper: {
        label: "Shipper",
        filterLabel: "Filter Shipper",
        filterContent: (
          <CheckboxFilter
            handleFilter={handleFilter}
            options={SHIPPER_NAMES_OPTIONS}
            filterKey="shipper"
          />
        ),
      },
      pickup: {
        label: "Pickup",
        filterLabel: "Filter by pickup status",
        filterContent: (
          <CheckboxFilter
            handleFilter={handleFilter}
            options={PICKUP_OPTIONS}
            filterKey="pickup"
          />
        ),
      },
    },
  ];
};
