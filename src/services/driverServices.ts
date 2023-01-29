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

export interface IFetchAllDriversResponse {username: string, userId: string};

export const fetchAllDrivers = async () => {
  try {
    const response: any = await axios.get("/api/driver/", {
      withCredentials: false,
    });

    return response.data
      .slice(0, 10)
      .map(({ username, userId }: IFetchAllDriversResponse) => ({ username, userId }));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const assignToDriver = async (ticketIDs: string[], driverID: string) => {
  let error: string | null = null;
  try {
    await Promise.all(
      ticketIDs.map((ticketId) =>
        axios.post("/api/milestones/AssignmentMilestones", {
          withCredentials: false,
          data: {
            ticketId,
            oldStatus: "checked_into_inventory",
            newStatus: "assigned",
            assignedByUserId: 761909011,
            assignedToUserId: driverID,
          },
        })
      )
    );
  } catch (e: any) {
    error = e?.toString?.() || `error assigned ticket to driver: ${driverID}`;
  }
  return { error };
};
