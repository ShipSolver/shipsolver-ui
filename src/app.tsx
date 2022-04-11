import React from "react";

import { RecoilRoot } from "recoil";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/ScopedCssBaseline";

import LongshipBrand from "./LongshipBrand";
import ScrollReset from "./utils/ScrollReset";

import AuthenticationRoutes from "./pages/authentication";
import AppRoutes from "./pages/app";
import RouteProtector from "./utils/routeProtector";

function App() {
  return (
    <ThemeProvider theme={LongshipBrand}>
      <BrowserRouter>
        <CssBaseline />
        <ScrollReset />
        <RecoilRoot>
          <Routes>
            <Route
              path="/authentication/*"
              element={<AuthenticationRoutes />}
            />
            <Route
              path="/*"
              element={
                <RouteProtector>
                  <AppRoutes />
                </RouteProtector>
              }
            />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
