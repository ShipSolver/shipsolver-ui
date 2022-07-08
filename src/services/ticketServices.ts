import axios from "axios";

import { SERVER_URL } from "./constants";

import ticketsByStatus from "../mockData/todaysTickets.json";
import tickets from "../mockData/tickets.json";
import { Ticket, TicketStatus } from "./types";
import moment from "moment";
import { DateFormat } from "../pages/app/org/components/allTicketsTable/components/filters/dateRangeFilter";

import { AllTicketsTableRows } from "../pages/app/org/components/allTicketsTable/allTicketsTable";
import { TicketInformationStateType } from "../pages/app/org/components/ticketDetails/components/ticketInformation";

axios.defaults.baseURL = SERVER_URL;

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, time);
  });
};

type TicketForStatusRes = {
  count: number,
  tickets: Ticket[]
}
export const fetchTicketsForStatus = (status: TicketStatus) => {
  return axios.get(`/api/ticket/status/${status}`, {params:{
    limit: 10
  }}) as Promise<TicketForStatusRes>
};

export const fetchOrgCurrentDelivery = () => {
  const mockServerTicketFetch = async () => {
    await delay(250);
    return tickets.tickets[0] as Ticket;
  };
  return mockServerTicketFetch();
};

export const fetchAllTickets = async () => {
  try {
    const response: any = await axios.get("/api/ticket/", {
      withCredentials: false,
    });

    const data: AllTicketsTableRows[] = response.data.map(
      ({
        barcodeNumber,
        ticketId,
        shipperCompany,
        customer,
        timestamp,
        consigneeAddress,
        consigneeName,
      }: any) => ({
        date: moment(new Date(timestamp)).format(DateFormat),
        firstParty: customer.name,
        consigneeName,
        consigneeAddress,
        barcodeNumber,
        shipper: shipperCompany,
        pickup: "1",
        ticketId,
      })
    );

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchTicket = async (ticketId: string) => {
  try {
    const response: any = await axios.get(`/api/ticket/${ticketId}`, {
      withCredentials: false,
    });

    const {
      customer,
      shipperCompany,
      shipperName,
      shipperAddress,
      shipperPhoneNumber,
      shipperPostalCode,
      BOLNumber,
      specialInstructions,
      weight,
      claimedNumberOfPieces,
      barcodeNumber,
      houseReferenceNumber,
      consigneeCompany,
      consigneeName,
      consigneeAddress,
      consigneePhoneNumber,
      consigneePostalCode,
    } = response.data;

    const data: TicketInformationStateType = {
      firstParty: customer.name,
      shipper: {
        company: shipperCompany,
        name: shipperName,
        address: shipperAddress,
        phoneNum: shipperPhoneNumber,
        postalCode: shipperPostalCode,
      },
      shipmentDetails: {
        specialInst: specialInstructions,
        bolNum: BOLNumber,
        weight,
        numPieces: claimedNumberOfPieces,
        barcode: barcodeNumber,
        refNum: houseReferenceNumber,
      },
      consignee: {
        company: consigneeCompany,
        name: consigneeName,
        address: consigneeAddress,
        phoneNum: consigneePhoneNumber,
        postalCode: consigneePostalCode,
      },
      isPickup: true,
      enterIntoInventory: true,
    };

    const commodities = response.data.pieces.split(",");

    return [data, commodities];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchMilestones = async (ticketId: string) => {
  try {
    const response: any = await axios.get(`/api/milestones/${ticketId}`, {
      withCredentials: false,
    });
  } catch (e) {}
};
