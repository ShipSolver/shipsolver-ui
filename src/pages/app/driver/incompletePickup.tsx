import React, { useState } from "react";
import { ReasonsType, ReasonsProps, ReasonsPage } from "./reasonsPage";

export const IncompletePickupReasons: ReasonsType[] = [
  { reason: "Freight Not Ready", id: "freightNotReady" },
  { reason: "No Freight", id: "noFreight" },
  { reason: "Closed", id: "closed" },
  { reason: "Cancelled", id: "cancelled" },
  { reason: "Other", id: "other" },
];

export const IncompletePickup = ({ reasons }: ReasonsProps) => {
  return (
    <ReasonsPage
      title="Reason for incomplete pickup"
      reasons={reasons}
      textfieldLabel="Additional Comments:"
    />
  );
};
