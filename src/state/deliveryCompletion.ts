import { atom } from "recoil";
import { Ticket } from "../services/types";

export const DeliveryCompletionTicketAtom = atom<Ticket | null>({
  key: "deliveryCompletionTicket",
  default: null,
});
