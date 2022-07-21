import axios from "axios";
import { SERVER_URL } from "./constants";

import drivers from "../mockData/drivers.json";
import { Driver } from "./types";

axios.defaults.baseURL = SERVER_URL;

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, time);
  });
};

export const fetchDriver = (driverID: string) => {
  const mockServerDriverFetch = async () => {
    await delay(250);
    return drivers.testDriver as Driver;
  };
  return mockServerDriverFetch();
};


export const fetchAllDrivers = async() => {
  try {
    const response: any = await axios.get("/api/driver/", {
      withCredentials: false,
    });

    return response.data.slice(0, 10).map(({firstName, lastName}: any) => firstName + " " + lastName);
  } catch (e) {
    console.error(e);
    throw e;
  }
};


export const assignToDriver = async(ticketIDs: string[], driverID: string) => {
  console.log("sent")
}