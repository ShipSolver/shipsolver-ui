import React from 'react';
import { styled } from "@mui/material/styles";

export const Spacer = styled("div")(
    ({ height = "", width = "" }: { height?: string; width?: string }) => `
    height: ${height};
    width: ${width};
  `
  );