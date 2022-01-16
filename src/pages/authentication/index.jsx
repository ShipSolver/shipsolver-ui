import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useStateContext } from "../../state";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Loading from "../components/loading";
import Copyright from "../components/copyright";

import Login from "./login";
import SignupManager from "./signupManager";
import SignupStandardUser from "./signupStandardUser";
import Home from "./home";
import SignupConfirmation from "./signupConfirmation";

function AuthenticationRouter({ location }) {
  const referer =
    location && location.state && location.state.referer
      ? location.state.referer
      : "/";

  const { AuthenticationState } = useStateContext();
  const { user, loading, refreshUser } = AuthenticationState;

  useEffect(() => {
    (async () => {
      await refreshUser();
    })();
  }, []);

  return user ? (
    <Navigate to={referer} />
  ) : loading ? (
    <Loading />
  ) : (
    <Container component="main" maxWidth="sm" className="wlp-brand-app-content">
      <Routes>
        <Route path="signup_confirmation" element={<SignupConfirmation />} />
        <Route path="signup_standard_user" element={<SignupStandardUser />} />
        <Route path="signup_manager" element={<SignupManager />} />
        <Route path="login" element={<Login />} />
        <Route index element={<Home />} />
      </Routes>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default observer(AuthenticationRouter);
