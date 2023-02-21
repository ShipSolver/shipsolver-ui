import { atom } from "recoil";
import { ListType } from "../components/list";

export const refetchAtom = atom<{ [key in ListType]?: () => void }>({
  key: "refetch",
  default: {},
});
