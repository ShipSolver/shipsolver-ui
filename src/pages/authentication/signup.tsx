import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";

import Loading from "../components/loading";
import { validateEmail } from "../../utils/regex";
import { signup } from "../../services/authenticationServices";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ErrorAtom, UnconfirmedUsernameAtom } from "../../state/authentication";

function Signup() {
  const setUnconfirmedUsername = useSetRecoilState(UnconfirmedUsernameAtom)
  const setError = useSetRecoilState(ErrorAtom);

  const [loading, setLoading] = useState<boolean>(false);
  
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordStrengthError, setPasswordStrengthError] = useState<string>(
    ""
  );
  const [emailHelp, setEmailHelp] = useState<string>("");
  const [passwordHelp, setPasswordHelp] = useState<string>("");
  const [invalidForm, setInvalidForm] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    const validEmail = validateEmail(email);
    const passwordMatch = password == confirmPassword;
    const passwordStrength = passwordStrengthError == "";
    const phoneExists = phone !== "";
    if (validEmail && passwordMatch && passwordStrength && phoneExists) {
      setInvalidForm(null);
      setLoading(true);
      const { error: err } = await signup({
        name: firstName + " " + lastName,
        email,
        password,
        phone: "+1" + phone.replaceAll("-", ""),
      });
      setError(err);
      setLoading(false);
      if (err == null){
        setUnconfirmedUsername(email)
        navigate("/authentication/signup-code-confirmation")
      };
    } else {
      if (!passwordMatch) {
        setPasswordHelp("Passwords do not match");
      }
      if (!validEmail) {
        setEmailHelp("Please enter a valid email");
      }
      if (!phoneExists) {
        setInvalidForm("Invalid phone number");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {invalidForm !== null ? (
        <Alert severity="error">{invalidForm}</Alert>
      ) : null}
      <Typography component="h1" variant="h2" color="primary" align="center">
        <b>Sign up as a user</b>
      </Typography>
      <div className="ss-brand-spacer-small" />
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
                setPhone("");
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
        <Grid container sx={{ justifyContent: "end" }}>
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
