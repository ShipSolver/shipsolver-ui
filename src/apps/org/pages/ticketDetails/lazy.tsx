import { lazy } from "react";

export const LazyTicketDetails = lazy(() =>
  import(
    /* webpackChunkName: "TicketDetails" */ "."
  ).then((module) => ({
    default: module.TicketDetails,
  }))
);