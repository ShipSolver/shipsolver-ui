import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const RoundedPaper = styled(Paper)(({ theme }) => ({
  boxShadow: "var(--ss-brand-box-shadow)",
  borderRadius: "var(--ss-brand-border-radius)",
  padding: "var(--ss-brand-card-padding)",
}));

export default RoundedPaper;
