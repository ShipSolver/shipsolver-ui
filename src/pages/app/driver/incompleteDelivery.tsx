import React, { useState } from "react";
import { ReasonsType, ReasonsProps, ReasonsPage } from "./reasonsPage";
import { useNavigate } from "react-router-dom";

export const IncompleteDeliveryReasons: ReasonsType[] = [
  { reason: "Closed", id: "closed" },
  { reason: "Customer Refusal", id: "custRefusal" },
  { reason: "Customer Not Home", id: "custNotHome" },
  { reason: "Other", id: "other" },
];

export const IncompleteDelivery = ({ reasons }: ReasonsProps) => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/");
  };
  return (
    <ReasonsPage
      title="Reason for incomplete delivery"
      reasons={reasons}
      textfieldLabel="Enter Reason:"
      action={handleCancelClick}
    />
  );
};
