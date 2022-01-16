import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DraftsIcon from "@mui/icons-material/Drafts";
import Avatar from "@mui/material/Avatar";
import { indigo } from "@mui/material/colors";

import Link from "../components/plainLink";

function SignupConfirmation(props) {
  return (
    <Paper
      sx={{
        marginTop: "64px",
        padding: "calc(var(--wlp-brand-spacing)*3)",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ marginBottom: "32px" }} color="primary" variant="h2">
        Check your email for a confirmation letter!
      </Typography>
      <Avatar
        sx={{
          width: "64px",
          height: "64px",
          marginBottom: "32px",
          bgcolor: indigo[500],
        }}
      >
        <DraftsIcon />
      </Avatar>
      <Link to="/authentication/login" style={{ width: "100%" }}>
        <Button fullWidth variant="contained" color="primary">
          Log In
        </Button>
      </Link>
    </Paper>
  );
}

export default SignupConfirmation;
