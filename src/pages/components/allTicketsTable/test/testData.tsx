import { HeaderRowType, RowType } from "../components/ticketTable";
import {
  BrokerFilter,
  ConsigneeFilter,
  DateRangeFilter,
  FirstPartyFilter,
  ShipperFilter,
  StatusTypeFilter,
} from "../components/filters";

type Keys =
  | "date"
  | "status"
  | "firstParty"
  | "consignee"
  | "lastAssigned"
  | "barcode"
  | "shipper";

export const TestColumns: HeaderRowType<Keys> = {
  date: {
    label: "Date",
    filterLabel: "Filter Date range",
    filterContent: <DateRangeFilter />,
  },
  status: {
    label: "Status",
    filterLabel: "Filter Status type",
    filterContent: <StatusTypeFilter />,
  },
  firstParty: {
    label: "First Party",
    filterLabel: "Filter First Party",
    filterContent: <FirstPartyFilter />,
  },
  consignee: {
    label: "Consignee",
    filterLabel: "Filter Consignee",
    filterContent: <ConsigneeFilter />,
  },
  lastAssigned: {
    label: "Last Broker Assigned to",
    filterLabel: "Filter Broker",
    filterContent: <BrokerFilter />,
  },
  barcode: {
    label: "Barcode",
  },
  shipper: {
    label: "Shipper",
    filterLabel: "Filter Shipper",
    filterContent: <ShipperFilter />,
  },
};

export const TestRows: RowType<Keys>[] = [
  {
    date: "2022/02/12",
    status: "Delivered",
    firstParty: "CEVA",
    consignee: "224 Wilson Avenue",
    lastAssigned: "Rahul",
    barcode: "DG104-123456",
    shipper: "Amazon",
    ticketID: "1",
  },
  {
    date: "2022/02/12",
    status: "Delivered",
    firstParty: "CEVA",
    consignee: "224 Wilson Avenue",
    lastAssigned: "Rahul",
    barcode: "DG104-123456",
    shipper: "Amazon",
    ticketID: "2",
  },
  {
    date: "2022/02/12",
    status: "Delivered",
    firstParty: "CEVA",
    consignee: "224 Wilson Avenue",
    lastAssigned: "Rahul",
    barcode: "DG104-123456",
    shipper: "Amazon",
    ticketID: "3",
  },
  {
    date: "2022/02/12",
    status: "Delivered",
    firstParty: "CEVA",
    consignee: "224 Wilson Avenue",
    lastAssigned: "Rahul",
    barcode: "DG104-123456",
    shipper: "Amazon",
    ticketID: "4",
  },
  {
    date: "2022/02/12",
    status: "Delivered",
    firstParty: "CEVA",
    consignee: "224 Wilson Avenue",
    lastAssigned: "Rahul",
    barcode: "DG104-123456",
    shipper: "Amazon",
    ticketID: "5",
  },
  {
    date: "2022/02/12",
    status: "Delivered",
    firstParty: "CEVA",
    consignee: "224 Wilson Avenue",
    lastAssigned: "Rahul",
    barcode: "DG104-123456",
    shipper: "Amazon",
    ticketID: "6",
  },
];
