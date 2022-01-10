import { createContext, useContext } from "react";
import AuthenticationState from "./authenticationState";
import AuthenticationService from "../services/authenticationService";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const authenticationService = new AuthenticationService();
  const authenticationState = new AuthenticationState(authenticationService);

  return (
    <StateContext.Provider
      value={{
        AuthenticationState: authenticationState,
        AuthenticationService: authenticationService,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
