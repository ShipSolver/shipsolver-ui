import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { styled } from "@mui/material/styles";

const PlainLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "inherit",
  "&:focus, &:hover, &:visited, &:link, &:active": {
    textDecoration: "none",
  },
}));

export default (props: LinkProps) => <PlainLink {...props} />;
