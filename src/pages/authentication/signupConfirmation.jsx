import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DraftsIcon from "@mui/icons-material/Drafts";
import Avatar from "@mui/material/Avatar";
import { indigo } from "@mui/material/colors";

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
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="primary"
        onClick={() => props.history.push("/authentication/login")}
      >
        Log In
      </Button>
    </Paper>
  );
}

export default SignupConfirmation;
