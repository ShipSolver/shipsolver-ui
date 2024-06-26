import React, { useState } from "react";
import { ReasonsType, ReasonsProps, ReasonsPage } from "./reasonsPage";
import { useNavigate } from "react-router-dom";
import { DeliveryCompletionTicketAtom } from "../../state/deliveryCompletion";
import { useResetRecoilState } from "recoil";

export const IncompleteDeliveryReasons: ReasonsType[] = [
  { reason: "Closed", id: "closed" },
  { reason: "Customer Refusal", id: "custRefusal" },
  { reason: "Customer Not Home", id: "custNotHome" },
  { reason: "Other", id: "other" },
];

export const IncompleteDelivery = ({ reasons }: ReasonsProps) => {
  const navigate = useNavigate();
  const resetCompletionDelivery = useResetRecoilState(
    DeliveryCompletionTicketAtom
  );

  const handleSubmit = () => {
    resetCompletionDelivery();
    navigate("/");
  };

  const handleCancel = () => {
    console.log("cancel");
    resetCompletionDelivery();
    navigate("/");
  };

  return (
    <ReasonsPage
      title="Reason for incomplete delivery"
      reasons={reasons}
      textfieldLabel="Enter Reason:"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
