import axios from "axios";
import { SERVER_URL } from "./constants";

import tickets from "../mockData/tickets.json";
import { Ticket } from "./types";
import moment from "moment";
import { DateFormat } from "../pages/app/org/components/allTicketsTable/components/filters/dateRangeFilter";

import { AllTicketsTableRows } from "../pages/app/org/components/allTicketsTable/allTicketsTable";

axios.defaults.baseURL = SERVER_URL;

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, time);
  });
};

export const fetchOrgTodayTickets = () => {
  const mockServerTicketFetch = async () => {
    await delay(250);
    return tickets.tickets as Ticket[];
  };
  return mockServerTicketFetch();
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

    console.log(response);

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

    console.log("data", data);

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
