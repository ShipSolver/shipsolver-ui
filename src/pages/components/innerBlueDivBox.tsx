import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const InnerBlueDivBox = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.light,
  margin: 10,
  padding: 10,
}));
export default InnerBlueDivBox;
