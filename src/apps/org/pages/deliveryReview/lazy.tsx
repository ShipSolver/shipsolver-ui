import { lazy } from "react";

export const LazyDeliveryReview = lazy(() =>
  import(
    /* webpackChunkName: "DeliveryReview" */ "."
  ).then((module) => ({
    default: module.DeliveryReview,
  }))
);