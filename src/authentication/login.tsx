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
import {
  ErrorAtom,
  UnconfirmedUsernameAtom,
  AuthenticatedUsernameAtom,
} from "../state/authentication";
import { login } from "../services/authenticationServices";
import Loading from "../components/loading";
import { validateEmail } from "../utils/regex";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const setUnconfirmedUsername = useSetRecoilState(UnconfirmedUsernameAtom);

  const setError = useSetRecoilState(ErrorAtom);
  const resetError = useResetRecoilState(ErrorAtom);
  const setUser = useSetRecoilState(AuthenticatedUsernameAtom);

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
      const {
        user,
        error: err,
        unconfirmedUser,
      } = await login({
        email,
        password,
        rememberMe,
      });
      setLoading(false);

      if (unconfirmedUser === true) {
        setUnconfirmedUsername(email);
        navigate("/authentication/signup-code-confirmation");
      }

      setError(err);
      setUser(user);
    } else {
      setFormError("Please enter a valid email and password");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="ss-brand-spacer" />
      <Typography component="h1" variant="h2" color="primary" align="center">
        <b>Log in</b>
      </Typography>
      <div className="ss-brand-spacer" />
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
          if (e.key == "Enter") handleLogin();
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
      <div className="ss-brand-spacer" />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{
          margin:
            "calc(var(--ss-brand-spacing)*3), 0, calc(var(--ss-brand-spacing)*2)",
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
