import React, { useEffect, useState } from "react";
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

function Login(props) {
  const { AuthenticationState } = useStateContext();
  const { error, login, setError, errorDefault } = AuthenticationState;

  useEffect(() => {
    setError(errorDefault);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState(null);

  const handleLogin = async (event) => {
    setError(errorDefault);
    if (validateEmail(email) && password != "") {
      setFormError(null);
      await login(email, password, rememberMe);
    } else {
      setFormError("Please enter a valid email and password");
    }
  };

  console.log({ error, formError, errorDefault });

  return (
    <>
      {(error && error != "") || (formError && formError != "") ? (
        <Alert severity="error">
          {error && error != "" ? error : formError}
        </Alert>
      ) : null}
      <div className="wlp-brand-spacer" />
      <Typography component="h1" variant="h2" color="primary" align="center">
        <b>Log in</b>
      </Typography>
      <div className="wlp-brand-spacer" />
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
      <div className="wlp-brand-spacer" />
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
        Go
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/authentication/forgot_password" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/authentication/" variant="body2">
            {"Don't have an account? Go home"}
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default observer(Login);
