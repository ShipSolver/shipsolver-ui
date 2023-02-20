import { atom } from "recoil";

export const assignedTicketsRefetchAtom = atom<() => void>({
  key: "assignedTicketsRefetch",
  default: () => {},
});

export const inventoryTicketsRefetchAtom = atom<() => void>({
  key: "inventoryTicketsRefetch",
  default: () => {},
});
