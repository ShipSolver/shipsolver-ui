import React, { useState } from "react";
import { ReasonsType, ReasonsProps, ReasonsPage } from "./reasonsPage";
import { useNavigate } from "react-router-dom";

export const IncompleteShiftReasons: ReasonsType[] = [
  { reason: "Out of Hours", id: "outOfHours" },
  { reason: "Bad Weather", id: "badWeather" },
  { reason: "Accident", id: "accident" },
  { reason: "Other", id: "other" },
];

export const ShiftCompletion = ({ reasons }: ReasonsProps) => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <ReasonsPage
      title="Reason for completing shift before finishing deliveries"
      reasons={reasons}
      textfieldLabel="Enter Reason:"
      action={handleCancelClick}
    />
  );
};
