import React from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/ScopedCssBaseline";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import ShipSolverBrand from "../ShipSolverBrand";
import "../index.css";

export default function MockAppRoot({ children }: { children: JSX.Element }) {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={ShipSolverBrand}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}
