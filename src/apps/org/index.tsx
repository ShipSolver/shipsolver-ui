import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Copyright from "../../components/copyright";
import Header from "./pages/header";

import Home from "./pages/home";
import { LazyTicketFactory } from "./pages/ticketFactory/lazy";
import { LazyAllTicketsTable } from "./pages/allTicketsTable/lazy";
import { LazyTicketDetails } from "./pages/ticketDetails/lazy";
import { LazyDeliveryReview } from "./pages/deliveryReview/lazy";
import Loading from "../../components/loading";
import "./app.css";

function AppRouter() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="ticket-factory"
            element={
              <Suspense fallback={<Loading />}>
                <LazyTicketFactory />
              </Suspense>
            }
          />
          <Route
            path="all-tickets"
            element={
              <Suspense fallback={<Loading />}>
                <LazyAllTicketsTable />
              </Suspense>
            }
          />
          <Route
            path="pod-review/:ticketId?"
            element={
              <Suspense fallback={<Loading />}>
                <LazyDeliveryReview completeDelivery />
              </Suspense>
            }
          />
          <Route
            path="incomplete-delivery-review/:ticketId?"
            element={
              <Suspense fallback={<Loading />}>
                <LazyDeliveryReview />
              </Suspense>
            }
          />
          <Route
            path="ticket-details/:ticketId"
            element={
              <Suspense fallback={<Loading />}>
                <LazyTicketDetails />
              </Suspense>
            }
          />
        </Routes>
        <Box mt={4}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default AppRouter;
