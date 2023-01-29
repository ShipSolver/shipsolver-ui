import React from "react";

import { RecoilRoot } from "recoil";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/ScopedCssBaseline";

import ShipSolverBrand from "./ShipSolverBrand";
import ScrollReset from "./utils/ScrollReset";

import AuthenticationRoutes from "./authentication";
import AppRoutes from "./apps/org";
import DriverRoutes from "./apps/driver";
import RouteProtector from "./utils/routeProtector";

function App() {
  return (
    <ThemeProvider theme={ShipSolverBrand}>
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
                <RouteProtector
                  defaultRoute={<AppRoutes/>}
                  extraRoutes={{
                    driver: <DriverRoutes/>
                  }}
                  />
              }
            />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
