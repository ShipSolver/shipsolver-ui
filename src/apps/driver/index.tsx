import React from "react";

import { Routes, Route } from "react-router-dom";

import Box from "@mui/material/Box";

import Copyright from "../../components/copyright";

import { Home } from "./home";

import DeliveryCompletion from "./deliveryCompletion";

import { IncompletePickup, IncompletePickupReasons } from "./incompletePickup";
import { ShiftCompletion, IncompleteShiftReasons } from "./shiftCompletion";
import { DeclinePickup, DeclinePickupReasons } from "./declinePickup";
import Header from "../org/pages/header";

function DriverRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="complete-delivery" element={<DeliveryCompletion />} />
        <Route
          path="incomplete-pickup"
          element={<IncompletePickup reasons={IncompletePickupReasons} />}
        />
        <Route
          path="shift-complete"
          element={<ShiftCompletion reasons={IncompleteShiftReasons} />}
        />
        <Route
          path="decline-pickup"
          element={<DeclinePickup reasons={DeclinePickupReasons} />}
        />
      </Routes>
      <Box mt={4}>
        <Copyright />
      </Box>
    </>
  );
}

export default DriverRouter;
