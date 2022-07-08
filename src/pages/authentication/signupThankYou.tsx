import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Check from "@mui/icons-material/Check";
import Avatar from "@mui/material/Avatar";

import Link from "../components/plainLink";

function SignupTHankYou() {
  return (
    <Paper
      sx={{
        marginTop: "64px",
        padding: "calc(var(--ss-brand-spacing)*3)",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ marginBottom: "32px" }} color="primary" variant="h2">
        Thank you for signing up with ShipSolver!
      </Typography>
      <Avatar
        sx={{
          width: "64px",
          height: "64px",
          marginBottom: "32px",
        }}
      >
        <Check />
      </Avatar>
      <Link to="/authentication/login" style={{ width: "100%" }}>
        <Button fullWidth variant="contained" color="primary">
          Log In
        </Button>
      </Link>
    </Paper>
  );
}

export default SignupTHankYou;
