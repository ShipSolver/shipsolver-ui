import React, { useState } from "react";
import { ReasonsType, ReasonsProps, ReasonsPage } from "./reasonsPage";
import { useNavigate } from "react-router-dom";

export const DeclinePickupReasons: ReasonsType[] = [
  { reason: "Too Many Deliveries", id: "tooManyDeliveries" },
  { reason: "Traffic", id: "traffic" },
  { reason: "Out of the Way", id: "outOfTheWay" },
  { reason: "Other", id: "other" },
];

export const DeclinePickup = ({ reasons }: ReasonsProps) => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <ReasonsPage
      title="Reason for declining the pickup"
      reasons={reasons}
      textfieldLabel="Enter Reason:"
      onSubmit={handleCancelClick}
    />
  );
};
