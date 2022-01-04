import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DraftsIcon from "@material-ui/icons/Drafts";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: "32px",
  },
  paper: {
    marginTop: "64px",
    padding: theme.spacing(3),
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: "64px",
    height: "64px",
    marginBottom: "32px",
    backgroundColor: theme.palette.primary.main,
  },
}));

function SignupConfirmation(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.text} color="primary" variant="h2">
        Check your email for a confirmation letter!
      </Typography>
      <Avatar className={classes.avatar}>
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
