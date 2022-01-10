import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { Navigate, useNavigate } from "react-router-dom";

import Loading from "../components/Loading.jsx";
import { TransitionUp } from "../components/transitions.jsx";

import qs from "qs";

function NewPasswordPage({ location }) {
  const referer = location && location.state ? location.state.referer : "/";
  const params =
    location && location.search
      ? qs.parse(location.search, { ignoreQueryPrefix: true })
      : null;
  const resetToken = params && params.reset_token;

  if (!resetToken) return <Navigate to={"/authentication"} />;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrengthError, setPasswordStrengthError] = useState("");
  const [passwordHelp, setPasswordHelp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (
      resetToken &&
      password &&
      password != "" &&
      confirmPassword &&
      confirmPassword != "" &&
      (!passwordStrengthError || passwordStrengthError == "") &&
      (!passwordHelp || passwordHelp == "")
    ) {
      setLoading(true);
      let { error } = await resetPassword(password, resetToken);
      setError((error && error.message) || error);
      setSuccess(!error);
    } else {
      setError("Please correctly fill in password fields");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Dialog
        open={error != null}
        TransitionComponent={TransitionUp}
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
        TransitionComponent={TransitionUp}
        keepMounted
        onClose={() => navigate("/authentication/login")}
      >
        <DialogTitle>Successfully reset your password!</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => navigate("/authentication/login")}
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
      {error && error != "" ? <Alert severity="error">{error}</Alert> : null}
      <Typography component="h1" variant="h5" color="primary">
        Enter your new password!
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        error={
          passwordStrengthError && passwordStrengthError != "" ? true : false
        }
        helperText={
          passwordStrengthError && passwordStrengthError != ""
            ? passwordStrengthError
            : null
        }
        onChange={(event) => {
          let pass = event.target.value;
          if (pass != confirmPassword) {
            setPasswordHelp("Passwords do not match!");
          } else {
            setPasswordHelp("");
          }
          setPasswordStrengthError("");
          if (pass.length < 8)
            setPasswordStrengthError("password is not long enough");
          var hasUpperCase = /[A-Z]/.test(pass);
          var hasLowerCase = /[a-z]/.test(pass);
          var hasNumbers = /\d/.test(pass);
          var hasNonalphas = /\W/.test(pass);
          if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 4)
            setPasswordStrengthError(
              "Password must contain upper and lower case letters, numbers and symbols"
            );
          setPassword(event.target.value);
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        error={passwordHelp && passwordHelp != "" ? true : false}
        helperText={passwordHelp && passwordHelp != "" ? passwordHelp : null}
        type="password"
        id="confirmPassword"
        onChange={(event) => {
          let pass = event.target.value;
          if (pass != password) {
            setPasswordHelp("Passwords do not match!");
          } else {
            setPasswordHelp("");
          }
          setConfirmPassword(pass);
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          margin:
            "calc(var(--wlp-brand-spacing)*3), 0, calc(var(--wlp-brand-spacing)*2)",
        }}
        onClick={handleSubmit}
      >
        Reset Password
      </Button>
    </div>
  );
}

export default NewPasswordPage;
