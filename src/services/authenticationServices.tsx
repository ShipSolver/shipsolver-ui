import axios from "axios";
import decode from "jwt-decode";
import { MEMORY_STORAGE_KEY, TOKEN_STORAGE_KEY, SERVER_URL } from "./constants";
import { User } from "./types";
import authMockData from "../mockData/auth.json";

const TestUser = authMockData.testUser;

type decodedAccessToken = { user: User };

type Token = {
  access_token: string;
  refresh_token: string;
  expiry_time: number;
};

function anyToToken(data: any): Token {
  const keyValidators: Record<keyof Token, string | number> = {
    access_token: "string",
    refresh_token: "string",
    expiry_time: "number",
  };
  if (typeof data === "object" && data !== null) {
    let maybeToken = data as Token;
    for (const key of Object.keys(keyValidators) as Array<keyof Token>) {
      if (typeof maybeToken[key] !== keyValidators[key]) {
        throw new Error("data is not a Token");
      }
    }
    return maybeToken;
  }
  throw new Error("data is not a Token");
}

axios.defaults.baseURL = SERVER_URL;

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, time);
  });
};

type loginInfo = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type loginResponse = Promise<{ user: User | null; error: string | null }>;
type loginFn = (info: loginInfo) => loginResponse;

export const login: loginFn = async ({ email, password, rememberMe }) => {
  await delay(250);
  return { user: TestUser, error: null };

  // let user = null;
  // let error = null;

  // await axios
  //   .post("api/login", {
  //     email: email,
  //     password: password,
  //   })
  //   .then(async (res) => {
  //     const token = anyToToken(res.data);
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${token.access_token}`;
  //     try {
  //       const decoded = decode<decodedAccessToken>(token.access_token);
  //       user = decoded.user;
  //       await localStorage.setItem(
  //         MEMORY_STORAGE_KEY,
  //         JSON.stringify(rememberMe)
  //       );
  //       await localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  //     } catch (e) {
  //       delete axios.defaults.headers.common["Authorization"];
  //     }
  //   })
  //   .catch((e) => {
  //     error =
  //       (e.response && e.response.data && e.response.data.response_message) ||
  //       e.message ||
  //       "Username and/or Password are incorrect";
  //     delete axios.defaults.headers.common["Authorization"];
  //   });
  // return { user, error };
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

  await delay(500);
  return { error };

  // await axios
  //   .post("api/register", {
  //     name: name,
  //     email: email,
  //     password: password,
  //     phone: phone,
  //   })
  //   .catch((e) => {
  //     error =
  //       (e.response && e.response.data && e.response.data.response_message) ||
  //       e.message ||
  //       "Could not sign up user";
  //   });
  // return { error };
};

type refreshResponse = Promise<{ user: User | null; error: string | null }>;
type refreshFn = () => refreshResponse;

export const refreshUser: refreshFn = async () => {
  await delay(250);
  return { user: TestUser, error: null };

  let user = null;
  let error = null;

  // const tokenString = await localStorage.getItem(TOKEN_STORAGE_KEY);

  // if (tokenString == null) {
  //   //if no stored token user must log in again
  //   if (axios.defaults.headers.common["Authorization"])
  //     delete axios.defaults.headers.common["Authorization"];
  // } else {
  //   let token = anyToToken(JSON.parse(tokenString));
  //   const rememberMe = await localStorage.getItem(MEMORY_STORAGE_KEY);

  //   const expiryTime = token.expiry_time;
  //   const currentTime = new Date().getTime() / 1000;
  //   const expired = currentTime > expiryTime;

  //   if (expired && rememberMe) {
  //     //refresh token if out of date
  //     await axios
  //       .post("/refresh", {
  //         refresh_token: token.refresh_token,
  //         grant_type: "refresh_token",
  //       })
  //       .then(async (res) => {
  //         token = res.data;
  //         axios.defaults.headers.common[
  //           "Authorization"
  //         ] = `Bearer ${token.access_token}`;
  //         try {
  //           let decoded = decode<decodedAccessToken>(token.access_token);
  //           user = decoded.user;
  //           await localStorage.setItem(
  //             TOKEN_STORAGE_KEY,
  //             JSON.stringify(token)
  //           );
  //         } catch (e) {
  //           error = "Error restoring user";
  //           user = null;
  //         }
  //       })
  //       .catch((e) => {
  //         error = e.message || "Error restoring user";
  //         user = null;
  //       });
  //   } else if (!expired) {
  //     // if token is stil valid update headers and get user object
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${token.access_token}`;
  //     try {
  //       const decoded = decode<decodedAccessToken>(token.access_token);
  //       user = decoded.user;
  //       error = null;
  //     } catch (e) {
  //       error = "Error logging user in. Please log in again";
  //       user = null;
  //     }
  //   } else {
  //     // token is expired and the user doesn't want to be remembered
  //     user = null;
  //     error = null;
  //   }
  // }

  // return { user, error };
};

type logoutResponse = Promise<{ error: string | null }>;
type logoutFn = () => logoutResponse;

export const logout: logoutFn = async () => {
  await delay(250);
  return { error: null };

  // let loggedOut = false;

  // let error = null;
  // try {
  //   localStorage.removeItem(TOKEN_STORAGE_KEY);
  //   localStorage.removeItem(MEMORY_STORAGE_KEY);
  // } catch (err) {
  //   error = "Could not remove login info from device";
  // }

  // return { error };
};

type forgotPasswordInfo = {
  email: string;
};
type forgotPasswordResponse = Promise<{ error: string | null }>;
type forgotPasswordFn = (info: forgotPasswordInfo) => forgotPasswordResponse;

export const forgotPassword: forgotPasswordFn = async ({ email }) => {
  await delay(500);
  return { error: null };
  // let error = null;
  // await axios
  //   .post("api/forgot-password", {
  //     email,
  //   })
  //   .catch((e) => {
  //     error = e.message || "Error at forgot password";
  //   });

  // return { error };
};

type resetPasswordInfo = {
  password: string;
  resetToken: string;
};
type resetPasswordResponse = Promise<{ error: string | null }>;
type resetPasswordFn = (info: resetPasswordInfo) => resetPasswordResponse;

export const resetPassword: resetPasswordFn = async ({
  password,
  resetToken,
}) => {
  await delay(1500);
  return {
    error: null,
  };
  // let error = null;
  // await axios
  //   .post("api/reset-password", {
  //     password,
  //     reset_password_token: resetToken,
  //   })
  //   .catch((e) => {
  //     error = e.message || "Could not reset password";
  //   });

  // return { error };
};

type userAgreementResponse = Promise<string>;
type userAgreementFn = () => userAgreementResponse;

export const getStandardUserAgreement: userAgreementFn = async () => {
  return (
    "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
    "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
    "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
    "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
    "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
    "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times"
  );

  // let error = null;
  // let agreement = null;
  // await axios
  //   .get(`${SERVER_URL}api/standard_user_agreement`)
  //   .then((res) => {
  //     agreement = res.data;
  //   })
  //   .catch((e) => {
  //     error = e.message || "Could not retreive Standard User Agreement";
  //   });

  // return { agreement, error };
};
