import { lazy } from "react";

export const LazyAllTicketsTable = lazy(() =>
  import(
    /* webpackChunkName: "AllTicketsTable" */ "."
  ).then((module) => ({
    default: module.AllTicketsTable,
  }))
);