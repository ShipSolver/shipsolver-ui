import React from "react";
import { styled } from "@mui/material/styles";

interface ISpacer {
  height?: string;
  width?: string;
}

export const Spacer = styled("div")(
  ({ height, width }: ISpacer) => `
    height: ${height};
    width: ${width};
  `
);
