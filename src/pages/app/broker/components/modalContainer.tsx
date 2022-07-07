import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const ModalContainer = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.main,
  padding: 5,
  margin: 15,
  marginBottom: 10,
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "90vw",
  //   margin: "auto",
  border: "2px solid #000",
}));
export default ModalContainer;
