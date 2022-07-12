import { Auth } from "aws-amplify";
import { atom, selector, useSetRecoilState } from "recoil";
import { User } from "../services/types";
import { CognitoUser } from "@aws-amplify/auth";
import {useRecoilValue} from 'recoil'
import { useEffect, useState } from "react";

export const UnconfirmedUsernameAtom = atom<string | null>({
  key: "unconfirmedUsernameAtom",
  default: null
})

export const AuthenticatedUsernameAtom = atom<string | null>({
  key: "authenticatedUsernameAtom",
  default: null
})

export const ErrorAtom = atom<string | null>({
  key: "authenticationErrorAtom",
  default: null
})

export const useGetUserInfo = () => {
  const currentUsername = useRecoilValue(AuthenticatedUsernameAtom)
  const setAuthError = useSetRecoilState(ErrorAtom)
  const [userInfo, setUserInfo] = useState<User | null>(null)
  useEffect(() =>{
    if(currentUsername != null){
      Auth.currentUserPoolUser().then(user => {
        const cognitoUser = user as CognitoUser
        cognitoUser.getUserAttributes((error, userAttributes) => {
          if(!error){
            const email : string | null = userAttributes?.find(({Name}) => Name === 'email')?.Value ?? null
            const name : string | null = userAttributes?.find(({Name}) => Name === 'name')?.Value ?? null
            const phone : string | null = userAttributes?.find(({Name}) => Name === 'phone_number')?.Value ?? null
            const type : string | null = userAttributes?.find(({Name}) => Name === 'custom:UserType')?.Value ?? null

            if(email && name && phone){
              setUserInfo({
                email, name , phone , type: type ?? undefined
              })
            }else{
              setAuthError("Error retreiving user email, name or phone")
            }
          } else {
            setAuthError(error.toString())
          }
        })
      }).catch(err => {
        setAuthError((err.toString && err.toString()) ?? "Error getting user info")
      })
    }
  }, [currentUsername, setUserInfo, setAuthError])

  return userInfo
}