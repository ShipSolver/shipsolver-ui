import React from "react";
import { Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Copyright from "../components/copyright";
import Header from "./components/header";

import Settings from "./settings";
import Home from "./home";

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    alignItems: "center",
    flexDirection: "column",
    [`${theme.breakpoints.down("xs")}`]: {
      paddingBottom: "70px",
    },
  },
  appBarSpacer: theme.mixins.toolbar,
}));

function AppRouter() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className={classes.appBarSpacer} style={{ minHeight: "75px" }} />
      <Grid container directon="column" className={classes.main}>
        <Grid item container spacing={2} xs={12} md={10}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </Grid>
        <Box mt={4}>
          <Copyright />
        </Box>
      </Grid>
    </div>
  );
}

export default AppRouter;
