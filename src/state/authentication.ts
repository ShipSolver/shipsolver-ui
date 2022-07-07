import { atom } from "recoil";

export const UnconfirmedUsernameAtom = atom<string | null>({
  key: "unconfirmedUerAtom",
  default: null
})

export const UserAtom = atom<string | null>({
  key: "authenticatedUserAtom",
  default: null
})

export const ErrorAtom = atom<string | null>({
  key: "authenticationErrorAtom",
  default: null
})