import React from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "../components/plainLink";

function Home() {
  return (
    <>
      <Typography variant="h3" align="center">
        Welcome to
      </Typography>
      <Typography variant="h1" align="center">
        <b>ShipSolver</b>
      </Typography>
      <div className="ss-brand-spacer" />
      <Link to="login">
        <Button
          variant="contained"
          fullWidth
          className="ss-brand-margin-vertical ss-brand-padding-large"
        >
          <b>LOGIN</b>
        </Button>
      </Link>
      <Link to="signup-org">
        <Button
          variant="contained"
          fullWidth
          className="ss-brand-margin-vertical ss-brand-padding-large"
        >
          <b>SIGN UP AS AN ORGANIZATION</b>
        </Button>
      </Link>
      <Link to="signup-broker">
        <Button
          variant="contained"
          fullWidth
          className="ss-brand-margin-vertical ss-brand-padding-large"
        >
          <b>SIGN UP AS A BROKER</b>
        </Button>
      </Link>
    </>
  );
}

export default Home;
