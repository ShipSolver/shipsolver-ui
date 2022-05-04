import React from "react";

import Button from "@mui/material/Button";
import Paper from "../components/roundedPaper";

import Lists from "../components/multiList";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Lists
        listSpecifications={[
          { title: "Column", entries: [{}], entryRenderer: () => <div /> },
        ]}
      />
      <Button variant="contained" onClick={() => navigate("/ticket-factory")}>
        Create Tickets
      </Button>
    </>
  );
}

export default Home;
