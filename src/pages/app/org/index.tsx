import React from "react";
import { Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Copyright from "../../components/copyright";
import Header from "./components/header";

import Home from "./home";
import TicketFactory from "./ticketFactory";

import { AllTicketsTable } from './components/allTicketsTable/allTicketsTable';
import { TicketDetails } from './components/ticketDetails/ticketDetails';

import "./app.css";

function AppRouter() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <Routes>
          <Route index element={<Home />} />
          <Route path="ticket-factory" element={<TicketFactory />} />
          <Route path="all-tickets" element={<AllTicketsTable/>}/>
          <Route path="ticket-details/:ticketId" element={<TicketDetails />} />
        </Routes>
        <Box mt={4}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default AppRouter;
