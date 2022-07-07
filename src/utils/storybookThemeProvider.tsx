import React from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/ScopedCssBaseline";
import ShipSolverBrand from "../ShipSolverBrand";
import "../index.css";

export default function StoryBookThemeProvider({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <ThemeProvider theme={ShipSolverBrand}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}