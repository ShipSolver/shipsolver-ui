import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const PlainLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:focus, &:hover, &:visited, &:link, &:active": {
    textDecoration: "none",
  },
}));

export default (props) => <PlainLink {...props} />;
