import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { NavRedirectState } from "./types";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Loading from "../components/loading";
import Copyright from "../components/copyright";

import { UserAtom, ErrorAtom } from "../../state/authentication";
import { refreshUser } from "../../services/authenticationServices";

import Login from "./login";
import SignupStandardUser from "./signup";
import Home from "./home";
import SignupConfirmation from "./signupConfirmation";
import { useRecoilState, useSetRecoilState } from "recoil";

function AuthenticationRouter() {
  const location = useLocation();
  const state =
    location.state != null ? (location.state as NavRedirectState) : null;
  const referer = (state && state.referer) || "/";

  const [user, setUser] = useRecoilState(UserAtom);
  const setError = useSetRecoilState(ErrorAtom);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { user: u, error: e } = await refreshUser();
      setUser(u);
      setError(e);
      setLoading(false);
    })();
  }, [setLoading, setUser, setError]);

  return user ? (
    <Navigate to={referer} />
  ) : isLoading ? (
    <Loading />
  ) : (
    <Container component="main" maxWidth="sm" className="ss-brand-app-content">
      <Routes>
        <Route path="signup-confirmation" element={<SignupConfirmation />} />
        <Route path="signup" element={<SignupStandardUser />} />
        <Route path="login" element={<Login />} />
        <Route index element={<Home />} />
      </Routes>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default AuthenticationRouter;
