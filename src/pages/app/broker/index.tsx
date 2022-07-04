import React from "react";

import { Routes, Route } from "react-router-dom";

import Box from "@mui/material/Box";

import Copyright from "../../components/copyright";

import Home from "./home";

function BrokerRouter() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <Box mt={4}>
        <Copyright />
      </Box>
    </>
  );
}

export default BrokerRouter;
