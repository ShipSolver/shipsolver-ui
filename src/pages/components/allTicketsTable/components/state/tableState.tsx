import { atom } from "recoil";

export const singleRowSelectedAtom = atom<boolean>({
  key: "singleRowSelected",
  default: true,
});

export const multiRowSelectedAtom = atom<boolean>({
  key: "multiRowSelected",
  default: true,
});
