import type { User } from "./types";

import { atom } from "recoil";

export * from "./types";

export const UserAtom = atom<User | null>({
  key: "authenticationUser",
  default: null,
});

export const ErrorAtom = atom<any | null>({
  key: "authenticationError",
  default: null,
});
