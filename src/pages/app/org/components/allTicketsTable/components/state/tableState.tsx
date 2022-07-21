import { atom } from "recoil";

export const singleRowSelectedAtom = atom<boolean>({
  key: "singleRowSelected",
  default: false,
});

export const selectedTicketIdsAtom = atom<string[]>({
  key: "selectedTicketIds",
  default: [],
});

export const multiRowSelectedAtom = atom<boolean>({
  key: "multiRowSelected",
  default: false,
});

export const allDriversAtom = atom<{username: string, userId: string}[]>({
  key: "allDrivers",
  default: [],
});
