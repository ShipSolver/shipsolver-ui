import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../state";
import { observer } from "mobx-react-lite";

function RouteProtector({ location, children }) {
  const { AuthenticationState } = useStateContext();
  const { user } = AuthenticationState;

  return user !== null ? (
    children
  ) : (
    <Navigate to="/authentication" state={{ referer: location }} />
  );
}

export default observer(RouteProtector);
