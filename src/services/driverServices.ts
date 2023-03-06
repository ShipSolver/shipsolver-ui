import axios from "axios";
import { SERVER_URL } from "./constants";

import drivers from "../mockData/drivers.json";
import { Driver } from "./types";

axios.defaults.baseURL = SERVER_URL;
export interface IFetchAllDriversResponse {
  username: string;
  userId: string;
  firstName: string;
  lastName: string;
}

export const fetchAllDrivers = async (): Promise<
  { name: string; userId: string }[]
> => {
  try {
    const response: any = await axios.get("/api/driver/", {
      withCredentials: false,
    });

    return response.data.map(
      ({ firstName, lastName, userId }: IFetchAllDriversResponse) => ({
        name: firstName + " " + lastName,
        userId,
      })
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const assignToDriver = async (
  ticketIDs: number[],
  driverID: string,
  userID?: string
) => {
  let error: string | null = null;
  try {
    await axios.post("/api/milestones/AssignmentMilestones", {
      withCredentials: false,
      data: ticketIDs.map((ticketId) => ({
        ticketId,
        oldStatus: "checked_into_inventory",
        newStatus: "assigned",
        assignedByUserId: userID,
        assignedToUserId: driverID,
      })),
    });
    // await Promise.all(
    //   ticketIDs.map((ticketId) =>
    //     axios.post("/api/milestones/AssignmentMilestones", {
    //       withCredentials: false,
    //       data: {
    //         ticketId,
    //         oldStatus: "checked_into_inventory",
    //         newStatus: "assigned",
    //         assignedByUserId: userID,
    //         assignedToUserId: driverID,
    //       },
    //     })
    //   )
    // );
  } catch (e: any) {
    error = e?.toString?.() || `error assigned ticket to driver: ${driverID}`;
  }
  return { error };
};
