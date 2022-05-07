import axios from "axios";
import { SERVER_URL } from "./constants";

import brokers from "../mockData/brokers.json";
import { Broker } from "./types";

axios.defaults.baseURL = SERVER_URL;

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, time);
  });
};

export const fetchBroker = (brokerID: string) => {
  const mockServerBrokerFetch = async () => {
    await delay(250);
    return brokers.testBroker as Broker;
  };
  return mockServerBrokerFetch();
};
