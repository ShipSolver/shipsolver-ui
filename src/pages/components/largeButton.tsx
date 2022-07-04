import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const LargeButton = styled(Button)(({ theme }) => ({
  width: "75vw",
  padding: 5,
  marginTop: 5,
  fontSize: "1.25rem",
}));
export default LargeButton;
