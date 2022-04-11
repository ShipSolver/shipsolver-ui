import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { ErrorAtom, UserAtom } from "../../state/authentication";
import { login } from "../../services/authenticationServices";
import Loading from "../components/loading";
import { validateEmail } from "../../utils/regex";

function Login() {
  const [error, setError] = useRecoilState(ErrorAtom);
  const resetError = useResetRecoilState(ErrorAtom);
  const setUser = useSetRecoilState(UserAtom);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    resetError();
  }, [resetError]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [formError, setFormError] = useState<null | string>(null);

  const handleLogin = async () => {
    resetError();
    if (validateEmail(email) && password != "") {
      setFormError(null);
      setLoading(true);
      const { user: u, error: e } = await login({
        email,
        password,
        rememberMe,
      });
      setError(e);
      setUser(u);
      setLoading(true);
    } else {
      setFormError("Please enter a valid email and password");
    }
  };

  return loading ? (
    <Loading />
  ) : (
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

export default Login;
