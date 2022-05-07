import { atom } from "recoil";

import { User } from "../../services/types";

export const UserAtom = atom<User | null>({
  key: "authenticationUser",
  default: null,
});

export const ErrorAtom = atom<any | null>({
  key: "authenticationError",
  default: null,
});
