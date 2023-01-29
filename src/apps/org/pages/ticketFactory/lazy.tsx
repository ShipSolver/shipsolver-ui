import { lazy } from "react";

export const LazyTicketFactory = lazy(() =>
  import(
    /* webpackChunkName: "TicketFactory" */ "."
  ).then((module) => ({
    default: module.TicketFactory,
  }))
);