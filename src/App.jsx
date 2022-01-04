import React from "react";
import ScrollReset from "./utils/scrollReset";
import AppRoute from "./utils/appRoute";

import { Provider } from "react-redux";
import configureStore from "./redux/store";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import authenticationRoutes from "./pages/authentication";
import appRoutes from "./pages/app";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollReset />
        <Switch>
          <Route path="/authentication" component={authenticationRoutes} />
          <AppRoute path="/" component={appRoutes} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
