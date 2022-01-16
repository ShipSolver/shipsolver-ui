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
        <b>Warehouse Logger Pro</b>
      </Typography>
      <div className="wlp-brand-spacer" />
      <Link to="login">
        <Button
          variant="contained"
          fullWidth
          className="wlp-brand-margin-vertical wlp-brand-padding-large"
        >
          Login
        </Button>
      </Link>
      <Typography
        fullWidth
        variant="h6"
        align="center"
        className="wlp-brand-margin-vertical"
      >
        Or
      </Typography>
      <Link to="signup_manager">
        <Button
          variant="contained"
          fullWidth
          className="wlp-brand-margin-vertical wlp-brand-padding-large"
        >
          Signup as a&nbsp;<b>WAREHOUSE MANAGER</b>
        </Button>
      </Link>
      <Link to="signup_standard_user">
        <Button
          variant="contained"
          fullWidth
          className="wlp-brand-margin-vertical wlp-brand-padding-large"
        >
          Signup as a&nbsp;<b>USER</b>
        </Button>
      </Link>
    </>
  );
}

export default Home;
