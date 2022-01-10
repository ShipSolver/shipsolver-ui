import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { observer } from "mobx-react-lite";
import { useStateContext } from "../../state";

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function LogIn(props) {
  const { AuthenticationState } = useStateContext();
  const { error, login } = AuthenticationState;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState(null);

  const handleLogin = async (event) => {
    if (validateEmail(email) && password != "") {
      setFormError(null);
      await login(email, password, rememberMe);
    } else {
      setFormError("Please enter a valid email and password");
    }
  };

  return (
    <div>
      {(error && error != "") || (formError && formError != "") ? (
        <Alert severity="error">{error != "" ? error : formError}</Alert>
      ) : null}
      <Typography component="h1" variant="h4" color="primary">
        Sign in
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
        value={email}
        error={notice && notice != "" ? true : false}
        helperText={notice && notice != "" ? notice : null}
        onChange={(event) => {
          let emailStr = event.target.value;
          setEmail(emailStr.replace(" ", ""));
          if (!validateEmail(emailStr) && emailStr != "") {
            setNotice("Username is not a valid email");
          } else {
            setNotice("");
          }
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(event) => setPassword(event.target.value)}
        onKeyPress={(e) => {
          if (e.charCode == 13) handleLogin();
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
        }
        label="Remember me"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{
          margin:
            "calc(var(--wlp-brand-spacing)*3), 0, calc(var(--wlp-brand-spacing)*2)",
        }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/authentication/forgot_password" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/authentication/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(LogIn);
