import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserAtom } from "../state/authentication";
import { useRecoilValue } from "recoil";

function RouteProtector({ children }: { children: JSX.Element }): JSX.Element {
  const User = useRecoilValue(UserAtom);
  const location = useLocation();

  return User !== null ? (
    children
  ) : (
    <Navigate to="/authentication" state={{ referer: location }} />
  );
}

export default RouteProtector;
