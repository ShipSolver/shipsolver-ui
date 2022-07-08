import { atom } from "recoil";

export const singleRowSelectedAtom = atom<boolean>({
  key: "singleRowSelected",
  default: false,
});

export const multiRowSelectedAtom = atom<boolean>({
  key: "multiRowSelected",
  default: false,
});
