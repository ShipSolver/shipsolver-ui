import axios from "axios";
import { SERVER_URL, MEMORY_STORAGE_KEY } from "./constants";
import awsConfig from "./aws-exports";
import { Auth, Amplify } from "aws-amplify";
import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";

Amplify.configure(awsConfig);

axios.defaults.baseURL = SERVER_URL;

type loginInfo = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type loginResponse = Promise<{
  user: string | null;
  error: string | null;
  unconfirmedUser: boolean;
}>;
type loginFn = (info: loginInfo) => loginResponse;

export const login: loginFn = async ({ email, password, rememberMe }) => {
  let user = null;
  let error = null;
  let unconfirmedUser = false;

  try {
    const cognitoUser = (await Auth.signIn({
      username: email,
      password,
    })) as CognitoUser;
    user = email;
    localStorage.setItem(MEMORY_STORAGE_KEY, String(rememberMe));

    cognitoUser.getSession(
      (error: Error | null, session: CognitoUserSession | null) => {
        if (session !== null) {
          axios.defaults.headers.common["Authorization"] = session
            .getAccessToken()
            .getJwtToken();
        }
      }
    );
  } catch (err: any) {
    if (err.code && err.code === "UserNotConfirmedException")
      unconfirmedUser = true;
    error = err.toString != null ? err.toString() : "error signing up user";
  }
  return { user, error, unconfirmedUser };
};

type signupInfo = {
  email: string;
  password: string;
  name: string;
  phone: string;
};
type signupResponse = Promise<{ error: string | null }>;
type signupFn = (info: signupInfo) => signupResponse;

export const signup: signupFn = async ({ email, password, name, phone }) => {
  let error = null;

  try {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        email: email,
        name,
        phone_number: phone,
      },
    });
  } catch (err: any) {
    error = err.toString != null ? err.toString() : "error signing up user";
  }

  return { error };
};

type signupCodeInfo = {
  email: string;
  code: string;
};
type signupCodeResponse = Promise<{ error: string | null }>;
type signupCodeFn = (info: signupCodeInfo) => signupCodeResponse;

export const signupCodeConfirmation: signupCodeFn = async ({ email, code }) => {
  let error = null;
  try {
    const res = await Auth.confirmSignUp(email, code);
  } catch (err: any) {
    error =
      err.toString != null
        ? err.toString()
        : "error confirming user signup code";
  }

  return { error };
};

type refreshResponse = Promise<{ user: string | null; error: string | null }>;
type refreshFn = () => refreshResponse;

export const refreshUser: refreshFn = async () => {
  let user = null;
  let error = null;

  try {
    const rememberMe = localStorage.getItem(MEMORY_STORAGE_KEY) == "true";
    if (rememberMe) {
      const cognitoUser = (await Auth.currentUserPoolUser()) as CognitoUser;
      user = cognitoUser.getUsername();
      cognitoUser.getSession(
        (error: Error | null, session: CognitoUserSession | null) => {
          if (session !== null) {
            axios.defaults.headers.common["Authorization"] = session
              .getAccessToken()
              .getJwtToken();
          }
        }
      );
    } else {
      Auth.signOut();
    }
  } catch (err: any) {
    error = err.toString != null ? err.toString() : "error refreshing user";
  }

  return { user, error };
};

type logoutResponse = Promise<{ error: string | null }>;
type logoutFn = () => logoutResponse;

export const logout: logoutFn = async () => {
  let error = null;
  try {
    await Auth.signOut();
    delete axios.defaults.headers.common["Authorization"];
  } catch (err: any) {
    error = err.toString != null ? err.toString() : "Error logging user out";
  }
  return { error };
};
