import { atom } from "recoil";
import { RowType, Keys } from "../../types";

export const singleRowSelectedAtom = atom<boolean>({
  key: "singleRowSelected",
  default: false,
});

export const selectedTicketsAtom = atom<{ [key: string]: boolean }>({
  key: "selectedTickets",
  default: {},
});

export const multiRowSelectedAtom = atom<boolean>({
  key: "multiRowSelected",
  default: false,
});

export const allDriversAtom = atom<{ username: string; userId: string }[]>({
  key: "allDrivers",
  default: [],
});

export const ticketsCacheAtom = atom<RowType[]>({
  key: "ticketsCache",
  default: [],
});

export const searchAtom = atom<string>({
  key: "searched",
  default: "",
});

export const filterAtom = atom<{[key in Keys]?: string | null | [Date, Date]}>({
  key: "filter",
  default: {},
});
