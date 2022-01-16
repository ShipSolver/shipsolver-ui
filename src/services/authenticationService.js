import axios from "axios";
import decode from "jwt-decode";
import { MEMORY_STORAGE_KEY, TOKEN_STORAGE_KEY, SERVER_URL } from "./constants";

export default class AuthenticationService {
  constructor() {
    axios.defaults.baseURL = SERVER_URL;
  }

  TestUser = {
    name: "Sathira Katugaha",
    manager: false,
  };

  delay = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, time);
    });
  };

  login = async ({ email, password, rememberMe }) => {
    let user = null;
    let error = null;
    await this.delay(250);
    return { user: this.TestUser };

    await axios
      .post("api/login", {
        email: email,
        password: password,
      })
      .then(async (res) => {
        const token = res.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.access_token}`;
        try {
          const decoded = decode(token.access_token);
          user = decoded.user;
          await localStorage.setItem(MEMORY_STORAGE_KEY, rememberMe);
          await localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
        } catch (e) {
          delete axios.defaults.headers.common["Authorization"];
        }
      })
      .catch((e) => {
        error =
          (e.response && e.response.data && e.response.data.response_message) ||
          e.message ||
          "Username and/or Password are incorrect";
        delete axios.defaults.headers.common["Authorization"];
      });
    return { user, error };
  };

  signup = async ({ email, password, name, phone, isManager }) => {
    let error = null;
    await this.delay(500);
    return { error };
    await axios
      .post("api/register", {
        name: name,
        email: email,
        password: password,
        is_manager: isManager,
        phone: phone,
      })
      .catch((e) => {
        error =
          (e.response && e.response.data && e.response.data.response_message) ||
          e.message ||
          "Could not sign up user";
      });
    return { error };
  };

  refreshUser = async () => {
    await this.delay(250);
    return { user: null, error: "User does not exist anymore" };

    let user = null;
    let error = null;

    let token = null;
    let rememberMe = false;

    try {
      const tokenJSON = await localStorage.getItem(TOKEN_STORAGE_KEY);
      token = JSON.parse(tokenJSON);
      rememberMe = await localStorage.getItem(MEMORY_STORAGE_KEY);
    } catch (e) {}

    if (!token) {
      //if no stored token user must log in again
      if (axios.defaults.headers.common["Authorization"])
        delete axios.defaults.headers.common["Authorization"];
    } else {
      const expiryTime = token.expiry_time;
      const currentTime = new Date().getTime() / 1000;
      const expired = currentTime > expiryTime;

      if (expired && rememberMe) {
        //refresh token if out of date
        await axios
          .post("/refresh", {
            refresh_token: token.refresh_token,
            grant_type: "refresh_token",
          })
          .then(async (res) => {
            token = res.data;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token.access_token}`;
            try {
              let decoded = decode(token.access_token);
              user = decoded.user;
              await localStorage.setItem(
                TOKEN_STORAGE_KEY,
                JSON.stringify(token)
              );
            } catch (e) {
              error = e.message || "Error restoring user";
              user = null;
            }
          })
          .catch((e) => {
            error = e.message || "Error restoring user";
            user = null;
          });
      } else if (!expired) {
        // if token is stil valid update headers and get user object
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.access_token}`;
        try {
          const decoded = decode(token.access_token);
          user = decoded.user;
          error = null;
        } catch (e) {
          error = "Error logging user in. Please log in again";
          user = null;
        }
      } else {
        // token is expired and the user doesn't want to be remembered
        user = null;
        error = null;
      }
    }

    return { user, error };
  };

  logout = async () => {
    let loggedOut = false;
    await this.delay(250);
    return { error: null };

    let error = null;
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(MEMORY_STORAGE_KEY);
    } catch (err) {
      error = err.message || "Could not remove login info from device";
    }

    return { error };
  };

  forgotPassword = async ({ email }) => {
    await this.delay(500);
    return {
      error: null,
    };
    let error = null;
    await axios
      .post("api/forgot-password", {
        email,
      })
      .catch((e) => {
        error = e.message || "Error at forgot password";
      });

    return { error };
  };

  resetPassword = async ({ password, resetToken }) => {
    await this.delay(1500);
    return {
      res: "Success. Please log in with your new password",
    };
    let error = null;
    await axios
      .post("api/reset-password", {
        password,
        reset_password_token: resetToken,
      })
      .catch((e) => {
        error = e.message || "Could not reset password";
      });

    return { error };
  };

  getStandardUserAgreement = async () => {
    return (
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times"
    );
    let error = null;
    let agreement = null;
    await axios
      .get(`${SERVER_URL}api/standard_user_agreement`)
      .then((res) => {
        agreement = res.data;
      })
      .catch((e) => {
        error = e.message || "Could not retreive Standard User Agreement";
      });

    return { agreement, error };
  };

  getManagerAgreement = async () => {
    return (
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times" +
      "This is a long and complicated terms and conditions paragraph. I got bored writing this so I will copy and past this a bunch of times"
    );
    let error = null;
    let agreement = null;
    await axios
      .get(`${SERVER_URL}api/manager_agreement`)
      .then((res) => {
        agreement = res.data;
      })
      .catch((e) => {
        error = e.message || "Could not retreive Manager Agreement";
      });

    return { agreement, error };
  };
}
