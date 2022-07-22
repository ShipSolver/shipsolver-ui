import axios from "axios";

import { SERVER_URL } from "./constants";

import tickets from "../mockData/tickets.json";
import { Ticket, TicketMilestone, TicketStatus } from "./types";
import moment from "moment";
import { DateFormat } from "../pages/app/org/components/allTicketsTable/components/filters/dateRangeFilter";

import { AllTicketsTableRows } from "../pages/app/org/components/allTicketsTable";
import {
  TicketInformationStateType,
  TicketType,
} from "../pages/app/org/components/ticketDetails/components/ticketInformation";

axios.defaults.baseURL = SERVER_URL;

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, time);
  });
};

type TicketForStatusRes = {
  count: number;
  tickets: Ticket[];
};
export const fetchTicketsForStatus = async (status: TicketStatus) => {
  const { data } = await axios.get(`/api/ticket/status/${status}`, {
    params: {
      limit: 10,
    },
  });
  return data as TicketForStatusRes;
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
        ticketStatus,
      }: any) => ({
        date: moment(new Date(timestamp)).format(DateFormat),
        status: ticketStatus.currentStatus,
        firstParty: customer.name,
        consigneeName,
        consigneeAddress,
        lastAssigned: ticketStatus.assignedTo,
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

export const fetchTickets = async (ticketIDs: string[]) => {
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

    const commodities = response.data.pieces
      .split(",")
      .map((commodity: string) => ({ description: commodity }));

    return [data, commodities];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export type changeTicketStatusRes = {
  error: string | null;
};

export const changeTicketStatus: (
  ticketId: number,
  assignedToUserId: number,
  oldStatus: TicketMilestone,
  newStatus: TicketMilestone
) => Promise<changeTicketStatusRes> = async (
  ticketId: number,
  assignedToUserId: number,
  oldStatus: TicketMilestone,
  newStatus: TicketMilestone
) => {
  let error = null;
  try {
    await axios.post("/api/milestones/AssignmentMilestones", {
      ticketId,
      assignedToUserId,
      assignedByUserId: assignedToUserId,
      oldStatus: oldStatus.split(".")[1],
      newStatus: newStatus.split(".")[1],
    });
  } catch (e: any) {
    error =
      e?.toString?.() ??
      `Error changing milestone status for ticket ${ticketId} from ${oldStatus} to ${newStatus}`;
  }

  return { error };
};

export const fetchMilestones = async (ticketId: string) => {
  try {
    const response: any = await axios.get(`/api/milestones/${ticketId}`, {
      withCredentials: false,
    });

    return response.data.map(({ description, timestamp }: any) => ({
      description,
      dateAndTime: new Date(timestamp),
    }));
  } catch (e) {
    console.error(e);
    throw e;
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
  picture1Link,
  PODLink,
  customerSignatureLink,
}: {
  ticketId: string;
  picture1Link?: string;
  PODLink: string;
  customerSignatureLink: string;
}) => {
  let error: string | null = null;
  try {
    await axios.post("/api/milestones/DeliveryMilestones", {
      ticketId,
      picture1Link,
      PODLink,
      customerSignatureLink,
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
  pieces,
  firstParty,
}: TicketType) => {
  const payload = JSON.stringify({
    customer: {
      name: firstParty,
    },
    shipperCompany: shipper.company,
    shipperName: shipper.name,
    shipperAddress: shipper.address,
    shipperPhoneNumber: shipper.phoneNum,
    shipperPostalCode: shipper.postalCode,
    BOLNumber: shipmentDetails.bolNum,
    specialInstructions: shipmentDetails.specialInst,
    weight: shipmentDetails.weight,
    claimedNumberOfPieces: shipmentDetails.numPieces,
    pieces,
    barcodeNumber: shipmentDetails.barcode,
    houseReferenceNumber: shipmentDetails.refNum,
    consigneeCompany: consignee.company,
    consigneeName: consignee.name,
    consigneeAddress: consignee.address,
    consigneePhoneNumber: consignee.phoneNum,
    consigneePostalCode: consignee.postalCode,
  });

  try {
    const response: any = await axios.post(`/api/ticket/`, {
      withCredentials: false,
      data: payload,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const checkIntoInventory = async (ticketIDs: string[]) => {
  try {
    const response: any = await Promise.all(
      ticketIDs.map((ticketId) =>
        axios.post("/api/milestones/InventoryMilestones", {
          withCredentials: false,
          data: {
            ticketId,
            oldStatus: "DeliveryTicketCreated ",
            newStatus: "checked_into_inventory",
            approvedByUserId: "761909011",
          },
        })
      )
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
