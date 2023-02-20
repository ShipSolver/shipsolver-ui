import { atom } from "recoil";

export const assignedTicketsRefetchAtom = atom<() => void>({
  key: "assignedTicketsRefetch",
  default: () => {},
});
