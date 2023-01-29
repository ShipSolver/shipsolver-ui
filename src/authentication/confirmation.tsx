import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DraftsIcon from "@mui/icons-material/Drafts";
import Avatar from "@mui/material/Avatar";
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();
  return (
    <div>
      <Typography
        align="center"
        color="primary"
        variant="h2"
        sx={{
          paddingBottom: "calc(var(--ss-brand-spacing)*2)",
        }}
      >
        Check your email for a confirmation letter!
      </Typography>
      <Paper>
        <Avatar
          sx={{
            bgcolor: indigo[500],
            paddingBottom: "calc(var(--ss-brand-spacing)*3)",
          }}
        >
          <DraftsIcon />
        </Avatar>
        <Typography
          align="center"
          sx={{
            paddingBottom: "calc(var(--ss-brand-spacing)*3)",
          }}
          variant="h5"
        >
          We verfiy your email for security purposes. Please click on the link
          we sent you to verify your email. Once you have confirmed your
          account, please Log In!
        </Typography>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={() => navigate("/authentication/login")}
        >
          Log In
        </Button>
      </Paper>
    </div>
  );
}

export default Confirmation;
