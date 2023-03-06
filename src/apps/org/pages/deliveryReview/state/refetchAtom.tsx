import { atom } from "recoil";

export const completedTicketsRefetchAtom = atom<() => void>({
  key: "completedTicketsRefetch",
  default: () => {},
});
