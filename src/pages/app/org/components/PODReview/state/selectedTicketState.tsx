import { atom } from "recoil";
import { TicketInformationStateType } from "../../ticketDetails/components";

export const selectedTicketIDAtom = atom<string | null>({
  key: "selectedID",
  default: null,
});
