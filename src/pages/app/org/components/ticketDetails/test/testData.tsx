import { EventHistoryType } from "../components/eventHistory";
import { TicketInformationStateType } from "../components/ticketInformation";
import { CommodityType } from "../components/commodities";
import { MilestoneType } from "../components/milestones";

const date = new Date("2022-02-18 17:04:15");

export const TestEventHistory: EventHistoryType[] = [
  {
    user: "Hector",
    userRole: "Manager",
    action: "Approve POD",
    dateAndTime: date,
  },
  {
    user: "Hector",
    userRole: "Manager",
    action: "Approve POD",
    dateAndTime: date,
  },
  {
    user: "Hector",
    userRole: "Manager",
    action: "Approve POD",
    dateAndTime: date,
  },
  {
    user: "Hector",
    userRole: "Manager",
    action: "Approve POD",
    dateAndTime: date,
  },
  {
    user: "Hector",
    userRole: "Manager",
    action: "Approve POD",
    dateAndTime: date,
  },
  {
    user: "Hector",
    userRole: "Manager",
    action: "Approve POD",
    dateAndTime: date,
  },
  {
    user: "Hector",
    userRole: "Manager",
    action: "Approve POD",
    dateAndTime: date,
  },
];

export const TestTicketInformation: TicketInformationStateType = {
  firstParty: "CEVA logistics",
  enterIntoInventory: true,
  isPickup: true,
  shipper: {
    company: "Amazon",
    name: "Jeff Bezos",
    address: "7995 WINSTON CHURCHILL BLVD BRAMPTON ON",
    phoneNum: "1000278675",
    postalCode: "L0S 1V0",
  },
  shipmentDetails: {
    refNum: "AY0058505",
    barcode: "DG104-0962055",
    numPieces: 1,
    weight: "148.815 lbs",
    specialInst: "APPT REQ TEL 9059754272 DEC 24 LOC MIS1-COL-I1",
  },
  consignee: {
    name: "AMY SMITH",
    address: "123 YONGE STREET",
    phoneNum: "4161234567",
    postalCode: "H0H 0H0",
  },
};

export const TestCommodities: CommodityType[] = [
  {
    description: "SWIFTLYFTE LION COMPETITIO",
    weight: "148.815 lbs",
    dimensions: "N/A",
  },
  {
    description: "SWIFTLYFTE LION COMPETITIO",
    weight: "148.815 lbs",
    dimensions: "N/A",
  },
  {
    description: "SWIFTLYFTE LION COMPETITIO",
    weight: "148.815 lbs",
    dimensions: "N/A",
  },
  {
    description: "SWIFTLYFTE LION COMPETITIO",
    weight: "148.815 lbs",
    dimensions: "N/A",
  },
  {
    description: "SWIFTLYFTE LION COMPETITIO",
    weight: "148.815 lbs",
    dimensions: "N/A",
  },
  {
    description: "SWIFTLYFTE LION COMPETITIO",
    weight: "148.815 lbs",
    dimensions: "N/A",
  },
];

export const TestMilestones: MilestoneType[] = [
  {
    description: "Fake milestone",
    dateAndTime: new Date(),
  },
  {
    description: "Fake milestone",
    dateAndTime: new Date(),
  },
  {
    description: "Fake milestone",
    dateAndTime: new Date(),
  },
  {
    description: "Fake milestone",
    dateAndTime: new Date(),
  },
  {
    description: "Fake milestone",
    dateAndTime: new Date(),
  },
];
