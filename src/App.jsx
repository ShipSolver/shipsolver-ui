import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { StateProvider } from "./state";

import WLPBrand from "./WLPBrand";

import ScrollReset from "./utils/scrollReset";
import RouteProtector from "./utils/routeProtector";

import AuthenticationRoutes from "./pages/authentication";
import AppRoutes from "./pages/app";

function App() {
  return (
    <ThemeProvider theme={WLPBrand}>
      <BrowserRouter>
        <CssBaseline />
        <ScrollReset />
        <StateProvider>
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
        </StateProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
