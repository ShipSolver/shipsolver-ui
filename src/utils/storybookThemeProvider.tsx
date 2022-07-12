import React from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/ScopedCssBaseline";
import ShipSolverBrand from "../ShipSolverBrand";
import "../index.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

export default function StoryBookThemeProvider({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <ThemeProvider theme={ShipSolverBrand}>
      <BrowserRouter>
        <RecoilRoot>
          <CssBaseline />
          {children}
        </RecoilRoot>
      </BrowserRouter>
    </ThemeProvider>
  );
}
