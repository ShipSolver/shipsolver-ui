import React from "react";

import Button from "@mui/material/Button";
import Paper from "../components/roundedPaper";

import Table from "../components/todaysTicketsTable";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Table />
      <Button variant="contained" onClick={() => navigate("/ticket-factory")}>
        Create Tickets
      </Button>
    </>
  );
}

export default Home;
