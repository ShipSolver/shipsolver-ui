export type UserType =
  | "driver"
  | "manager"
  | "dispatch"
  | "customer"
  | "driver"
  | "worker";

export type User = {
  name: string;
  email: string;
  phone: string;
  type?: string;
};

export type CreationTicketMilestone =
  | "Creation_Milestone_Status.ticket_created"
  | "Creation_Milestone_Status.unassigned_pickup";

export type PickupTicketMilestone =
  | "Pickup_Milestone_Status.unassigned_pickup"
  | "Pickup_Milestone_Status.requested_pickup"
  | "Pickup_Milestone_Status.accepted_pickup"
  | "Pickup_Milestone_Status.declined_pickup"
  | "Pickup_Milestone_Status.complete_pickup"
  | "Pickup_Milestone_Status.incomplete_pickup";

export type InventoryTicketMilestone =
  | "Inventory_Milestone_Status.ticket_created"
  | "Inventory_Milestone_Status.checked_into_inventory"
  | "Inventory_Milestone_Status.incomplete_delivery"
  | "Inventory_Milestone_Status.completed_delivery";

export type TicketAssignmentMilestone =
  | "Assignment_Milestone_Status.checked_into_inventory"
  | "Assignment_Milestone_Status.assigned"
  | "Assignment_Milestone_Status.in_transit";

export type TicketDeliveryMilestone =
  | "Delivery_Milestone_Status.in_transit"
  | "Delivery_Milestone_Status.completed_delivery";

export type TicketIncompleteDeliveryMilestone =
  | "Incomplete_Delivery_Milestone_Status.in_transit"
  | "Incomplete_Delivery_Milestone_Status.incomplete_delivery";

export type TicketMilestone =
  | CreationTicketMilestone
  | PickupTicketMilestone
  | InventoryTicketMilestone
  | TicketAssignmentMilestone
  | TicketDeliveryMilestone
  | TicketIncompleteDeliveryMilestone;

export type CreationTicketStatus = "ticket_created" | "unassigned_pickup";

export type PickupTicketStatus =
  | "unassigned_pickup"
  | "requested_pickup"
  | "accepted_pickup"
  | "declined_pickup"
  | "complete_pickup"
  | "incomplete_pickup";

export type InventoryTicketStatus =
  | "ticket_created"
  | "checked_into_inventory"
  | "incomplete_delivery"
  | "completed_delivery";

export type TicketAssignmentStatus =
  | "checked_into_inventory"
  | "assigned"
  | "in_transit";

export type TicketDeliveryStatus = "in_transit" | "completed_delivery";

export type TicketIncompleteDeliveryStatus =
  | "in_transit"
  | "incomplete_delivery";

export type TicketStatus =
  | CreationTicketStatus
  | PickupTicketStatus
  | InventoryTicketStatus
  | TicketAssignmentStatus
  | TicketDeliveryStatus
  | TicketIncompleteDeliveryStatus;

export type Ticket = {
  ticketStatus: {
    assignedTo: number;
    currentStatus: TicketMilestone;
    ticketId: number;
    user: {
      createdAt: number;
      email: string;
      firstName: string;
      lastName: string;
      modifiedAt: number;
      userId: number;
      userType: UserType;
      username: string;
    };
  };
  BOLNumber: number;
  barcodeNumber: number;
  claimedNumberOfPieces: number;
  consigneeAddress: string;
  consigneeCompany: string;
  consigneeName: string;
  consigneePhoneNumber: string;
  consigneePostalCode: string;
  customerName: string;
  customer: {
    customerId: number;
    name: string;
  };
  customerId: number;
  houseReferenceNumber: number;
  orderS3Link: string;
  pieces: string;
  shipperAddress: string;
  shipperCompany: string;
  shipperName: string;
  shipperPhoneNumber: string;
  shipperPostalCode: string;
  specialInstructions: string;
  specialServices: string;
  ticketEventId: number;
  ticketId: number;
  timestamp: number;
  user: {
    createdAt: number;
    email: string;
    firstName: string;
    lastName: string;
    modifiedAt: number;
    userId: number;
    userType: string;
    username: string;
  };
  userId: number;
  weight: number;
};

/**
 * expected:
 {"tickets": [
  {
    "BOLNumber": 489162603, 
    "barcodeNumber": 530493911, 
    "claimedNumberOfPieces": 3, 
    "consigneeAddress": "1712 Stephen Parks\nSouth Shelbyberg, WV 72070",
    "consigneeCompany": "Watts, Evans and Gaines",
    "consigneeName": "Ashley Ward",
    "consigneePhoneNumber": "(070)701-5359",
    "consigneePostalCode": "32756",
    "customer": {
      "customerId": 99,
      "name": "Franco, Bowers and Hanson"
    },
    "customerId": 99,
    "houseReferenceNumber": 219287676,
    "isPickup": false,
    "noSignatureRequired": false,
    "orderS3Link": "s3link",
    "pieces": "West project develop fall finally employee.",
    "shipperAddress": "03999 John Dale Suite 633\nNicholsonchester, MA 18219",
    "shipperCompany": "Kent PLC",
    "shipperName": "Eric Lopez",
    "shipperPhoneNumber": "624.475.0943",
    "shipperPostalCode": "27448",
    "specialInstructions": "Environmental environment glass station stop.",
    "specialServices": "Expect more age table.",
    "tailgateAuthorized": false,
    "ticketEventId": 3,
    "ticketId": 3,
    "ticketStatus": {
      "assignedTo": 273809914,
      "currentStatus": "Generic_Milestone_Status.assigned",
      "ticketId": 3,
      "user": {
        "createdAt": 1658364848,
        "email": "knavarro@faker.com",
        "firstName": "Kayla",
        "lastName": "Navarro",
        "modifiedAt": 1658364848,
        "userId": 273809914,
        "userType": "driver",
        "username": "knavarro"
      }
    },
    "timestamp": 1658364848,
    "user": {
      "createdAt": 1658364848,
      "email": "carroyo@faker.com",
      "firstName": "Chad",
      "lastName": "Arroyo",
      "modifiedAt": 1658364848,
      "userId": 587940103,
      "userType": "customer",
      "username": "carroyo"
    },
    "userId": 587940103,
    "weight": 191
  },
*/
// legacy, current model is missing fields we need
// export type Ticket = {
//   STATUS: string;
//   FIRST_PARTY: string;
//   HOUSE_REF: string;
//   BARCODE: string;
//   PCS: [
//     {
//       DESCRIPTION: string;
//     }
//   ];
//   NUM_PCS: string;
//   WEIGHT: string;
//   BOL_NUM: string;
//   SPECIAL_SERVICES: string;
//   SPECIAL_INSTRUCTIONS: string;
//   CURRENT_ASSIGNED_USER_ID: string;
//   NO_SIGNATURE_REQUIRED: boolean;
//   TAILGATE_AUTHORIZED: boolean;
//   IS_PICKUP: boolean;
//   APPOINTMENT_TIME: string;
//   CONSIGNEE: {
//     COMPANY: string;
//     NAME: string;
//     ADDRESS: string;
//     CITY: string;
//     PROVINCE: string;
//     POSTAL_CODE: string;
//     PHONE_NUMBER: string;
//   };
//   SHIPPER: {
//     COMPANY: string;
//     NAME: string;
//     ADDRESS: string;
//     CITY: string;
//     PROVINCE: string;
//     POSTAL_CODE: string;
//     PHONE_NUMBER: string;
//   };
//   MILESTONES: [
//     {
//       TIMESTAMP: string;
//       DESCRIPTION: string;
//     }
//   ];
//   EDITS: [
//     {
//       TIMESTAMP: string;
//       USERNAME: string;
//       CHANGES_MADE: [
//         {
//           FIELD_TYPE: string;
//           ORIGINAL_VALUE: string;
//           NEW_VALUE: string;
//         }
//       ];
//     }
//   ];
// };

export type Driver = {
  NAME: string;
  EMAIL: string;
  PHONE: string;
};

export type WorkerAppTicket = {
  RefNumber: string;
  address: string;
  status: string;
}

export type WorkerAppTicketStatus = 
  | "expected"
  | "confirmed";