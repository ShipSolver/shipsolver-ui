import axios from "axios";

import { SERVER_URL } from "./constants";

import tickets from "../mockData/tickets.json";
import {
  MilestonesModelTypes,
  Ticket,
  TicketMilestone,
  TicketStatus,
} from "./types";
import moment from "moment";
import { DateFormat } from "../apps/org/pages/allTicketsTable/components/filters/dateRangeFilter";
import { EventHistoryType } from "../apps/org/pages/ticketDetails/components/eventHistory";
import {
  TicketInformationStateType,
  TicketType,
} from "../apps/org/pages/ticketDetails/components/ticketInformation/types";

import { CommodityType } from "../apps/org/pages/ticketDetails/components/commodities";
import { RowType } from "../apps/org/pages/allTicketsTable/types";

// import axiosRetry from 'axios-retry';

// axiosRetry(axios, { retries: 3 });

axios.defaults.baseURL = SERVER_URL;

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, time);
  });
};

export type TicketForStatusRes = {
  count: number;
  tickets: Ticket[];
};
export const fetchTicketsForStatus = async (status: TicketStatus) => {
  try {
    const { data } = await axios.get(`/api/ticket/status/${status}`, {
      params: {
        limit: 10,
      },
    });
    return Promise.resolve(data as TicketForStatusRes);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchOrgCurrentDelivery = () => {
  const mockServerTicketFetch = async () => {
    await delay(250);
    return tickets.tickets[0] as Ticket;
  };
  return mockServerTicketFetch();
};

export const fetchAllTickets = async (): Promise<RowType[]> => {
  try {
    const response: { data: Ticket[] } = await axios.get("/api/ticket/", {
      withCredentials: false,
    });

    const data: RowType[] = response.data.map(
      ({
        barcodeNumber,
        ticketId,
        shipperCompany,
        customerName,
        timestamp,
        consigneeAddress,
        consigneeName,
        ticketStatus: { user, currentStatus },
      }: Ticket) => ({
        date: moment(new Date(timestamp)).format(DateFormat),
        status: currentStatus,
        firstParty: customerName,
        consigneeName,
        consigneeAddress,
        lastAssigned: user ? user.firstName + " " + user.lastName : "",
        barcodeNumber,
        shipper: shipperCompany,
        pickup: "Yes",
        ticketId,
      })
    );

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const fetchTickets = async (ticketIDs: number[]) => {
  try {
    const response: { data: any }[] = await Promise.all(
      ticketIDs.map((ticketID) =>
        axios.get(`/api/ticket/${ticketID}`, {
          withCredentials: false,
        })
      )
    );

    return response.map(({ data }) => data);
  } catch (e) {
    console.error(e);
  }
};

export const fetchTicket = async (
  ticketId?: number
): Promise<[TicketInformationStateType, CommodityType[]] | null> => {
  try {
    const { data }: { data: Ticket } = await axios.get(
      `/api/ticket/${ticketId}`,
      {
        withCredentials: false,
      }
    );

    const commodities: CommodityType[] = data.pieces
      .split(",+-")
      .map((commodity: string) => ({ description: commodity }));

    return [convertTicketToTicketInformation(data), commodities];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const markAsInTransit = async (
  ticketId: number,
  assignedToUserId: string
) => {
  let error = null;
  try {
    await axios.post("/api/milestones/AssignmentMilestones", {
      data: {
        ticketId,
        oldStatus: "assigned",
        newStatus: "in_transit",
        assignedToUserId,
      },
    });
  } catch (e: any) {
    error = e?.toString?.() ?? `Failed to mark as in transit`;
  }

  return { error };
};

export const markAsComplete = async (ticketId: number) => {
  let error = null;
  try {
    await axios.post("/api/milestones/DeliveryMilestones", {
      ticketId,
      oldStatus: "in_transit",
      newStatus: "completed_delivery",
    });
  } catch (e: any) {
    error = e?.toString?.() ?? `Failed to mark as complete`;
  }

  return { error };
};

export const markAsInComplete = async (ticketId: number) => {
  let error = null;
  try {
    await axios.post("/api/milestones/IncompleteDeliveryMilestones", {
      ticketId,
      oldStatus: "in_transit",
      newStatus: "incomplete_delivery",
    });
  } catch (e: any) {
    error = e?.toString?.() ?? `Failed to mark as incomplete`;
  }

  return { error };
};

interface IFetchMilestones {
  description: string;
  timestamp: number;
}

export const fetchMilestones = async (
  ticketId?: string
): Promise<{ description: string; dateAndTime: Date }[]> => {
  try {
    const response: { data: IFetchMilestones[] } = await axios.get(
      `/api/milestones/${ticketId}`,
      {
        withCredentials: false,
      }
    );

    return response.data.map(({ description, timestamp }) => ({
      description,
      dateAndTime: new Date(timestamp),
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const uploadTicketImage = async ({ file }: { file: File }) => {
  let error: string | null = null;
  let s3Link: string | null = null;

  const formData = new FormData();
  formData.append("upload[file]", file, file.name);
  try {
    const { data } = await axios.post("/api/blob_storage/", formData, {
      headers: {
        ...axios.defaults.headers.common,
        "Content-Type": "multipart/form-data",
      },
    });

    const { link } = data;
    s3Link = link;
  } catch (e: any) {
    error = e?.toString?.() || `Error uploading image ${file.name}`;
  }

  return { error, s3Link };
};

export const markTicketAsDelivered = async ({
  ticketId,
  userId,
  picture1,
  picture2,
  customerSignature,
  POD,
}: {
  ticketId: string;
  picture1: string;
  picture2?: string;
  POD: string;
  customerSignature: string;
  userId: string;
}) => {
  let error: string | null = null;
  try {
    await axios.post("/api/milestones/DeliveryMilestones", {
      data: {
        ticketId,
        completingUserId: userId,
        pictures: {
          "Picture1.jpeg": picture1,
          ...(picture2 && { "Picture2.jpeg": picture2 }),
          "Picture3.jpeg": customerSignature,
          "POD.jpeg": POD,
        },
        newStatus: "completed_delivery",
      },
    });
  } catch (e: any) {
    error = e?.toString?.() || `Error marking delivery ${ticketId} as complete`;
  }

  return { error };
};

export const createTicket = async ({
  shipper,
  shipmentDetails,
  consignee,
  firstParty,
  deliveryReceiptS3Path,
  pieces,
  noSignatureRequired,
  tailgateAuthorized,
}: TicketType): Promise<number | string> => {
  const payload = JSON.stringify({
    customerName: firstParty,
    shipperCompany: shipper.company,
    shipperName: shipper.name,
    shipperAddress: shipper.address,
    shipperPhoneNumber: shipper.phoneNum,
    shipperPostalCode: shipper.postalCode,
    BOLNumber: shipmentDetails.bolNum,
    specialInstructions: shipmentDetails.specialInst,
    weight: shipmentDetails.weight,
    claimedNumberOfPieces: pieces?.split(",+-").length ?? 0,
    barcodeNumber: shipmentDetails.barcode,
    houseReferenceNumber: shipmentDetails.refNum,
    consigneeCompany: consignee.company,
    consigneeName: consignee.name,
    consigneeAddress: consignee.address,
    consigneePhoneNumber: consignee.phoneNum,
    consigneePostalCode: consignee.postalCode,
    orderS3Link: deliveryReceiptS3Path,
    pieces,
    noSignatureRequired,
    tailgateAuthorized,
  });

  try {
    const {
      data: { ticketId },
    }: { data: { ticketId: number } } = await axios.post(`/api/ticket/`, {
      withCredentials: false,
      data: payload,
    });

    return ticketId;
  } catch (e) {
    return "Failed to create ticket";
  }
};

export const fetchTicketEdits = async (
  ticketId?: string
): Promise<EventHistoryType[]> => {
  try {
    const response: {
      data: { [key: string | "timestamp"]: string | number }[];
    } = await axios.get(`/api/ticket/edits/${ticketId}`, {
      withCredentials: false,
    });
    return response.data.map((edit) => {
      let dateAndTime;
      const actions = [];
      let user = "";

      for (const [key, val] of Object.entries(edit)) {
        switch (key) {
          case "timestamp":
            dateAndTime = new Date(val);
            break;
          case "firstName":
            user = val as string;
            break;
          case "lastName":
            user += (" " + val) as string;
            break;
          case "userId":
            break;
          default:
            actions.push(`Changed ${key} to \"${val}\"`);
            break;
        }
      }
      return {
        dateAndTime,
        actions,
        user,
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const editTicket = async (
  {
    shipper,
    shipmentDetails,
    consignee,
    firstParty,
    pieces,
    ...rest
  }: TicketType,
  ticketID: string
) => {
  const payload = JSON.stringify({
    customerName: firstParty,
    shipperCompany: shipper.company,
    shipperName: shipper.name,
    shipperAddress: shipper.address,
    shipperPhoneNumber: shipper.phoneNum,
    shipperPostalCode: shipper.postalCode,
    BOLNumber: shipmentDetails.bolNum,
    specialInstructions: shipmentDetails.specialInst,
    weight: shipmentDetails.weight,
    claimedNumberOfPieces: pieces?.split(",+-").length ?? 0,
    barcodeNumber: shipmentDetails.barcode,
    houseReferenceNumber: shipmentDetails.refNum,
    consigneeCompany: consignee.company,
    consigneeName: consignee.name,
    consigneeAddress: consignee.address,
    consigneePhoneNumber: consignee.phoneNum,
    consigneePostalCode: consignee.postalCode,
    pieces,
    ...rest,
  });

  try {
    await axios.post(`/api/ticket/${ticketID}`, {
      withCredentials: false,
      data: payload,
    });

    return null;
  } catch (e) {
    return "Failed to edit ticket";
  }
};

interface IMoveToIncomplete {
  ticketId: number;
  oldStatus: string;
  reasonForIncomplete: string;
  dueToEndedShift?: boolean;
}

export const moveToIncomplete = async (tickets: IMoveToIncomplete[]) => {
  try {
    const response: any = await Promise.all(
      tickets.map(
        ({
          ticketId,
          oldStatus,
          reasonForIncomplete,
          dueToEndedShift = false,
        }) =>
          axios.post("/api/milestones/IncompleteDeliveryMilestones", {
            withCredentials: false,
            data: {
              ticketId,
              oldStatus,
              newStatus: "incomplete_delivery",
              reasonForIncomplete,
              dueToEndedShift,
            },
          })
      )
    );
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const rejectDelivery = async (
  ticketId: number
): Promise<null | string> => {
  try {
    await axios.post("/api/milestones/InventoryMilestones", {
      withCredentials: false,
      data: {
        ticketId,
        oldStatus: "completed_delivery",
        newStatus: "incomplete_delivery",
      },
    });
    return null;
  } catch (e) {
    return "Failed to reject delivery";
  }
};

export const approveDelivery = async (
  ticketId: number
): Promise<null | string> => {
  try {
    await axios.post("/api/milestones/InventoryMilestones", {
      withCredentials: false,
      data: {
        ticketId,
        oldStatus: "completed_delivery",
        newStatus: "completed_delivery",
      },
    });
    return null;
  } catch (e) {
    return "Failed to approve delivery";
  }
};

export const checkIntoInventory = async (ticketIDs: number[]) => {
  try {
    await Promise.all(
      ticketIDs.map((ticketId) =>
        axios.post("/api/milestones/InventoryMilestones", {
          withCredentials: false,
          data: {
            ticketId,
            oldStatus: "incomplete_delivery",
            newStatus: "checked_into_inventory",
          },
        })
      )
    );
    return null;
  } catch (e) {
    return "Failed to check into inventory";
  }
};

export const deleteTickets = async (ticketIDs: number[]) => {
  try {
    await Promise.all(
      ticketIDs.map((ticketID) => axios.delete(`/api/ticket/${ticketID}`))
    );
    return null;
  } catch (e) {
    return "Failed to delete ticket";
  }
};

export function convertTicketToTicketInformation(
  ticket: Ticket
): TicketInformationStateType {
  const {
    customerName,
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
    orderS3Link,
    ...rest
  } = ticket;

  return {
    firstParty: customerName,
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
    deliveryReceiptLink: orderS3Link,
    ...rest,
  };
}

export const fetchCompletedDeliveryFiles = async (ticketId: number) => {
  try {
    const { data } = await axios.get(
      `/api/milestones/DeliveryMilestones/${ticketId}`,
      {
        withCredentials: false,
      }
    );
    return data[0];
  } catch (e) {
    console.error(e);
  }
};

export const fetchIncompletedDeliveryReasons = async (ticketId: number) => {
  try {
    const { data } = await axios.get(
      `/api/milestones/IncompleteDeliveryMilestones/${ticketId}`,
      {
        withCredentials: false,
      }
    );
    return data[0];
  } catch (e) {
    console.error(e);
  }
};
