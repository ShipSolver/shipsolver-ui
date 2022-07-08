import axios from "axios";

import { SERVER_URL } from "./constants";

import ticketsByStatus from "../mockData/todaysTickets.json";
import tickets from "../mockData/tickets.json";

import { Ticket, TicketStatus } from "./types";

axios.defaults.baseURL = SERVER_URL;

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, time);
  });
};

type statusTicketMap = {
  [key in TicketStatus]?: Ticket[]
}

const ticketsByStatusAsMap = ticketsByStatus as statusTicketMap

export const fetchTicketsForStatus = (status: TicketStatus) => {
  const mockServerTicketFetch = async () => {
    await delay(250);
    return ticketsByStatusAsMap[status] as Ticket[];
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
