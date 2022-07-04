import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserAtom } from "../state/authentication";
import { useRecoilValue } from "recoil";
import { User } from "../services/types";

type UserKeys = keyof User

type ExtraFlagRouteMap = {
  [key in UserKeys]?: JSX.Element;
}

type RouteProtectorProps = {
  defaultRoute: JSX.Element;
  extraRoutes?: ExtraFlagRouteMap
}

function RouteProtector({ 
  defaultRoute, 
  extraRoutes 
}: RouteProtectorProps): JSX.Element {
  const UserState = useRecoilValue(UserAtom);
  const location = useLocation();

  let renderRoute : JSX.Element | null = null
  if(UserState !== null){
    const extraRouteFlags = Object.keys(extraRoutes ?? {}) as UserKeys[]
    for(const flag of extraRouteFlags){
      if(UserState[flag] === true){
        renderRoute = extraRoutes?.[flag] ?? null
        break;
      }
    }
    if(renderRoute === null) renderRoute = defaultRoute
  }

  return renderRoute !== null ? (
    renderRoute
  ) : (
    <Navigate to="/authentication" state={{ referer: location }} />
  );
}

export default RouteProtector;
