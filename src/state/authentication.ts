import { Auth } from "aws-amplify";
import { atom, useSetRecoilState } from "recoil";
import { User } from "../services/types";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

export const UnconfirmedUsernameAtom = atom<string | null>({
  key: "unconfirmedUsernameAtom",
  default: null,
});

export const AuthenticatedUsernameAtom = atom<string | null>({
  key: "authenticatedUsernameAtom",
  default: null,
});

export const ErrorAtom = atom<string | null>({
  key: "authenticationErrorAtom",
  default: null,
});

export const useGetUserInfo = () => {
  const currentUsername = useRecoilValue(AuthenticatedUsernameAtom);
  const setAuthError = useSetRecoilState(ErrorAtom);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  useEffect(() => {
    if (currentUsername != null) {
      Auth.currentUserPoolUser()
        .then((user) => {
          const cognitoUser = user as CognitoUser;
          cognitoUser.getUserAttributes(async (error, userAttributes) => {
            if (!error) {
              const email: string | null =
                userAttributes?.find(({ Name }) => Name === "email")?.Value ??
                null;
              const name: string | null =
                userAttributes?.find(({ Name }) => Name === "name")?.Value ??
                null;
              const phone: string | null =
                userAttributes?.find(({ Name }) => Name === "phone_number")
                  ?.Value ?? null;
              const userID: string | null =
                userAttributes?.find(({ Name }) => Name === "sub")?.Value ??
                null;
              const type: string =
                userAttributes?.find(({ Name }) => Name === "custom:UserType")
                  ?.Value ?? "manager";

              if (email && name && phone && userID) {
                setUserInfo({
                  email,
                  name,
                  phone,
                  type,
                  userID,
                });
              } else {
                setAuthError("Error retreiving user email, name or phone");
              }
            } else {
              setAuthError(error.toString());
            }
          });
        })
        .catch((err) => {
          setAuthError(
            (err.toString && err.toString()) ?? "Error getting user info"
          );
        });
    }
  }, [currentUsername, setUserInfo, setAuthError]);

  return userInfo;
};
