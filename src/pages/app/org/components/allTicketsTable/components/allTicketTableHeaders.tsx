import React from "react";
import { HandleFilterType } from "./filters";

import { DateRangeFilter, CheckboxFilter } from "./filters";

import { HeaderRowType } from "./ticketTable";

const STATUS_OPTIONS = [
  "In-progress",
  "Inventory",
  "Assigned",
  "Incomplete",
  "Delivered",
];

export type Keys =
  | "date"
  // | "status"
  | "firstParty"
  | "consigneeName"
  | "consigneeAddress"
  // | "lastAssigned"
  | "barcodeNumber"
  | "shipper"
  | "pickup";

export const createAllTicketTableHeaders = async (
  handleFilter: HandleFilterType
): Promise<HeaderRowType<Keys>> => {
  const fetchFirstParties = () => {};
  const FIRST_PARTY_OPTIONS: string[] = ["test1", "test2", "test3"];
  const fetchConsigneeNames = () => {};
  const CONSIGNEE_NAMES_OPTIONS: string[] = ["test1", "test2", "test3"];
  const fetchConsigneeAddresses = () => {};
  const CONSIGNEE_ADDRESSES_OPTIONS: string[] = ["test1", "test2", "test3"];
  const fetchDriverNames = () => {};
  const DRIVER_NAMES_OPTIONS: string[] = ["test1", "test2", "test3"];
  const fetchShipperNames = () => {};
  const SHIPPER_NAMES_OPTIONS: string[] = ["test1", "test2", "test3"];

  return {
    date: {
      label: "Date",
      filterLabel: "Filter Date range",
      filterContent: <DateRangeFilter handleFilter={handleFilter} />,
    },
    // status: {
    //   label: "Status",
    //   filterLabel: "Filter Status type",
    //   filterContent: (
    //     <CheckboxFilter
    //       handleFilter={handleFilter}
    //       options={STATUS_OPTIONS}
    //       filterKey="status"
    //     />
    //   ),
    // },
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
    // lastAssigned: {
    //   label: "Last Assigned Driver",
    //   filterLabel: "Filter Driver",
    //   filterContent: (
    //     <CheckboxFilter
    //       handleFilter={handleFilter}
    //       options={DRIVER_NAMES_OPTIONS}
    //       filterKey="lastAssigned"
    //     />
    //   ),
    // },
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
    },
  };
};
