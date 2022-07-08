export type User = {
  name: string;
  email: string;
  phone: string;
  type?: string;
};

export type PickupTicketStatus =  
  "TICKET_CREATED" |
  "UNASSIGNED_PICKUP" |
  "REQUESTED_PICKUP" |
  "ACCEPTED_PICKUP" | 
  "DECLINED_PICKUP" |
  "COMPLETE_PICKUP" | 
  "INCOMPLETE_PICKUP"
  ;

export type InventoryTicketStatus = 
  "TICKET_CREATED" |
  "CHECKED_INTO_INVENTORY" |
  "INCOMPLETE_DELIVERY" |
  "COMPLETE_DELIVERY" |
  "APPROVED_POD"
  ;

export type TicketAssignmentStatus = 
  "CHECKED_INTO_INVENTORY" |
  "ASSIGNED" |
  "IN_TRANSIT"
  ;

export type TicketStatus = 
  PickupTicketStatus | 
  InventoryTicketStatus |
  TicketAssignmentStatus
  ;

export type Ticket = {
  BOLNumber: number, 
  barcodeNumber: number, 
  claimedNumberOfPieces: number, 
  consigneeAddress: string, 
  consigneeCompany: string, 
  consigneeName: string, 
  consigneePhoneNumber: string, 
  consigneePostalCode: string, 
  customer: {
    customerId: number, 
    name: string
  }, 
  customerId: number, 
  houseReferenceNumber: number, 
  orderS3Link: string, 
  pieces: string, 
  shipperAddress: string, 
  shipperCompany: string, 
  shipperName: string, 
  shipperPhoneNumber: string, 
  shipperPostalCode: string, 
  specialInstructions: string, 
  specialServices: string, 
  ticketEventId: number, 
  ticketId: number, 
  timestamp: number, 
  user: {
    createdAt: number, 
    email: string, 
    firstName: string, 
    lastName: string, 
    modifiedAt: number, 
    userId: number, 
    userType: string, 
    username: string
  }, 
  userId: number, 
  weight: number
}

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

export type Broker = {
  NAME: string;
  EMAIL: string;
  PHONE: string;
};
