import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import qs from "qs";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Loading from "../components/loading";
import { SlideUp } from "../components/transitions";

import { useRecoilState } from "recoil";
import { ErrorAtom } from "../state/authentication.js";

function NewPasswordPage() {
  const location = useLocation();
  const params = location.search
    ? qs.parse(location.search, { ignoreQueryPrefix: true })
    : null;
  const resetToken =
    params && params.reset_token ? (params.reset_token as string) : null;

  if (!resetToken) return <Navigate to={"/authentication"} />;

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordStrengthError, setPasswordStrengthError] = useState<string>(
    ""
  );
  const [passwordHelp, setPasswordHelp] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useRecoilState(ErrorAtom);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      password != "" &&
      confirmPassword != "" &&
      passwordStrengthError == "" &&
      passwordHelp == ""
    ) {
      console.log("TODO: reset password API functionality")
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
          const pass = event.target.value;
          if (pass != confirmPassword) {
            setPasswordHelp("Passwords do not match!");
          } else {
            setPasswordHelp("");
          }
          setPasswordStrengthError("");
          if (pass.length < 8)
            setPasswordStrengthError("password is not long enough");
          const hasUpperCase = /[A-Z]/.test(pass) ? 1 : 0;
          const hasLowerCase = /[a-z]/.test(pass) ? 1 : 0;
          const hasNumbers = /\d/.test(pass) ? 1 : 0;
          const hasNonalphas = /\W/.test(pass) ? 1 : 0;
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
          const pass = event.target.value;
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
            "calc(var(--ss-brand-spacing)*3), 0, calc(var(--ss-brand-spacing)*2)",
        }}
        onClick={handleSubmit}
      >
        Reset Password
      </Button>
    </div>
  );
}

export default NewPasswordPage;
