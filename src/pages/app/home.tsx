import React from "react";

import Button from "@mui/material/Button";
import Paper from "../components/roundedPaper";

import {useNavigate} from "react-router-dom"

function Home() {
  const navigate = useNavigate();

  return (
    <Paper>
      <Button variant="contained" onClick={() => navigate("/ticket-factory")}>Create Tickets</Button>
    </Paper>
  );
}

export default Home;
