import React from "react";
import { Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Copyright from "../components/copyright";
import Header from "./components/header";

import Home from "./home";

function AppRouter() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg">
        <Routes>
          <Route index element={<Home />} />
        </Routes>
        <Box mt={4}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default AppRouter;
