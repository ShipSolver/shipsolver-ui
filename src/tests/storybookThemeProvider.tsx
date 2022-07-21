import React from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/ScopedCssBaseline";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShipSolverBrand from "../ShipSolverBrand";
import "../index.css";

export default function StoryBookThemeProvider({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={ShipSolverBrand}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </RecoilRoot>
  );
}
