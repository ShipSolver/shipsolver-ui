import axios from "axios";
import { SERVER_URL } from "./constants";

import tickets from "../mockData/tickets.json";
import { Ticket } from "./types";

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
