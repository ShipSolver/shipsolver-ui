import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { connect } from "react-redux";
import { refreshUser } from "../../services/authenticationServices";

import Copyright from "../components/Copyright";
import Login from "./login";
import Signup from "./signup";
import SubscriptionCheckout from "./subscriptionCheckout";
import SignupConfirmation from "./signupConfirmation";

import { hasPaidSubscription } from "../../services/billingServices.js";

function AuthenticationRouter(props) {
  const referer =
    props.location && props.location.state && props.location.state.referer ? props.location.state.referer : "/";

  const [userHasPaid, setUserHasPaid] = useState(null);
  useEffect(() => {
    (async () => {
      const newUser = await refreshUser(props.dispatch, props.user);
      const _userHasPaid = await hasPaidSubscription();
      setUserHasPaid(_userHasPaid);
      if (newUser && !_userHasPaid && window.location.pathname != "/authentication/checkout")
        props.history.push(`/authentication/checkout`);
    })();
  });

  return props.user && userHasPaid ? (
    <Redirect to={referer} />
  ) : (
    <Container component="main" maxWidth={window.location.pathname != "/authentication/checkout" ? "xs" : "md"}>
      <Switch>
        <Route path="/authentication/signup/confirmation" component={SignupConfirmation} />
        <Route path="/authentication/signup" component={Signup} />
        <Route path="/authentication/checkout" component={SubscriptionCheckout} />
        <Route path="/authentication" component={Login} />
      </Switch>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapState = (state) => {
  return {
    user: state.authentication.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch: (data) => dispatch(data),
  };
};
export default connect(mapState, mapDispatch)(AuthenticationRouter);
