import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import Loading from "../components/loading";
import { SlideUp } from "../components/transitions";
import { validateEmail } from "../utils/regex";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (validateEmail(email)) {
      console.log("TODO: forgot password API")
    } else {
      setError("Please enter a valid email");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Container component="main" maxWidth="xs" sx={{ alignItems: "center" }}>
      <Dialog
        open={error != null}
        TransitionComponent={SlideUp}
        keepMounted
        onClose={() => setError(null)}
      >
        <DialogTitle>
          <b>ERROR:</b> {error}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setError(null)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={success}
        TransitionComponent={SlideUp}
        keepMounted
        onClose={() => navigate("/authentication/")}
      >
        <DialogTitle>
          Successfully sent your password reset! Check your email
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => navigate("/authentication/")} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Typography component="h1" variant="h5" color="primary">
        Enter your email here and we will send you a recovery link if your email
        is on file:
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        error={notice && notice != "" ? true : false}
        helperText={notice && notice != "" ? notice : null}
        onChange={(event) => {
          const emailStr = event.target.value;
          setEmail(emailStr);
          if (!validateEmail(emailStr) && emailStr != "") {
            setNotice("Username is not a valid email");
          } else {
            setNotice("");
          }
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          margin:
            "calc(var(--ss-brand-spacing)*3), 0, calc(var(--ss-brand-spacing)*2)",
        }}
      >
        Send Email
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/authentication/login" variant="body2">
            Remember your password? Sign in
          </Link>
        </Grid>
        <Grid item>
          <Link href="/authentication" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
        <div style={{ margin: "auto", marginTop: "15px" }}>
          <Link href="/authentication/contact_us">
            Need more help? Contact us!
          </Link>
        </div>
      </Grid>
    </Container>
  );
}

export default ForgotPassword;
