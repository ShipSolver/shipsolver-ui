import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const InnerWhiteDivBox = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: "#FFF",
  margin: 10,
  padding: 10,
}));
export default InnerWhiteDivBox;
