import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";

import { useStateContext } from "../../state/index.jsx";

import Loading from "../components/loading.jsx";

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrengthError, setPasswordStrengthError] = useState("");
  const [emailHelp, setEmailHelp] = useState("");
  const [passwordHelp, setPasswordHelp] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { AuthenticationService } = useStateContext();
  const signup = AuthenticationService.signup;

  const handleSignup = async (event) => {
    if (
      password == confirmPassword &&
      (passwordStrengthError == null || passwordStrengthError == "") &&
      validateEmail(email)
    ) {
      setInvalidForm(false);
      setLoading(true);
      const { error: err } = await signup({
        name: firstName + " " + lastName,
        email,
        password,
        isManager: false,
        phone,
      });
      setLoading(false);
      if (!err) navigate("/authentication/signup/confirmation");
      setError((err && err.message) || err);
    } else {
      setInvalidForm(true);
      if (password != confirmPassword) {
        setPasswordHelp("Passwords do not match");
      } else {
        setEmailHelp("Please enter a valid email");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {invalidForm ? <Alert severity="error">Check form fields</Alert> : null}
      {error && error != "" ? <Alert severity="error">{error}</Alert> : null}
      <Typography component="h1" variant="h4" color="primary">
        Sign up as a Broker
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lasttName"
            label="Last Name"
            name="lastName"
            onChange={(event) => setLastName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            error={emailHelp && emailHelp != "" ? true : false}
            helperText={emailHelp && emailHelp != "" ? emailHelp : null}
            onChange={(event) => {
              let emailStr = event.target.value;
              setEmail(emailStr.replace(" ", ""));
              if (!validateEmail(emailStr) && emailStr != "") {
                setEmailHelp("Username is not a valid email");
              } else {
                setEmailHelp("");
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
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
              passwordStrengthError && passwordStrengthError != ""
                ? true
                : false
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            error={passwordHelp && passwordHelp != "" ? true : false}
            helperText={
              passwordHelp && passwordHelp != "" ? passwordHelp : null
            }
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={phone}
            onChange={(e) => {
              let pn = e.target.value;
              if (!pn || !pn.length || pn.length == 0) {
                setPhone(null);
                return;
              }
              pn = pn.replace(" ", "");
              if (phone && pn.length < phone.length) {
                setPhone(pn);
                return;
              }
              if (pn.length < 13) {
                if (pn.length == 3 || pn.length == 7) pn = pn + "-";
                setPhone(pn);
              }
            }}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "14px" }}>
          <Typography
            variant="body2"
            style={{ color: "#8c8b8b", fontSize: "12px" }}
          >
            By clicking "SIGN UP", you are agreeing to our{" "}
            <Link href="/terms" style={{ fontWeight: "bold" }}>
              Terms & Conditions
            </Link>{" "}
            of creating an account
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
            style={{ marginTop: "7px" }}
          >
            Sign up
          </Button>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/authentication/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signup;
