import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const RoundedPaper = styled(Paper)(({ theme }) => ({
  boxShadow: "var(--wlp-brand-box-shadow)",
  borderRadius: "var(--wlp-brand-border-radius)",
  margin: theme.spacing(1),
  padding: "var(--wlp-brand-card-padding)",
}));

export default RoundedPaper;
