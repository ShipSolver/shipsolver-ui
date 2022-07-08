import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Loading from "../pages/components/loading";

import { AuthenticatedUsernameAtom, useGetUserInfo } from "../state/authentication";

type ExtraFlagRouteMap = {
  [key: string]: JSX.Element;
}

type RouteProtectorProps = {
  defaultRoute: JSX.Element;
  extraRoutes?: ExtraFlagRouteMap
}

function RouteProtector({ 
  defaultRoute, 
  extraRoutes 
}: RouteProtectorProps): JSX.Element {
  const authenticatedUsername = useRecoilValue(AuthenticatedUsernameAtom)
  const UserInfo = useGetUserInfo();
  const location = useLocation();

  let renderRoute : JSX.Element | null = null
  if(UserInfo !== null){
      const extraRouteFlags = Object.keys(extraRoutes ?? {})
      for(const flag of extraRouteFlags){
        if(UserInfo.type === flag){
          renderRoute = extraRoutes?.[flag] ?? null
          break;
        }
      }
    if(renderRoute === null) renderRoute = defaultRoute
  }

  return renderRoute !== null ? (
    renderRoute
  ) : (
    authenticatedUsername !== null ? <Loading/> :
    <Navigate to="/authentication" state={{ referer: location }} />
  );
}

export default RouteProtector;
