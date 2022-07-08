import { atom } from "recoil";

export const singleRowSelectedAtom = atom<boolean>({
  key: "singleRowSelected",
  default: false,
});

export const selectedTicketIdAtom = atom<string>({
  key: "selectedTicketId",
  default: ""
})

export const multiRowSelectedAtom = atom<boolean>({
  key: "multiRowSelected",
  default: false,
});
