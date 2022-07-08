import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const OuterBlueDivBox = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.main,
  padding: 5,
  margin: 15,
  marginBottom: 10,
}));
export default OuterBlueDivBox;
