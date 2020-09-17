import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import ProviderSignUp from "./ProviderSignUp";
import ProviderHome from "./ProviderHome";
import * as firebase from "firebase";
import MakeScreen from "./MakeScreen";
import Screen from "./Screen";

export default class RenderRoutes extends Component {
  render() {
    // const signedIn = !!firebase.auth().currentUser;
    const signedIn = false;
    const uid = "lisali48";
    return (
      <div>
        <Router>
          {signedIn && (
            <Route
              path={"/" + uid}
              exact={true}
              render={() => <ProviderHome />}
            />
          )}
          {signedIn && (
            <Route
              path={"/makescreen"}
              exact={true}
              render={() => <MakeScreen />}
            />
          )}
          {!signedIn && <Route path="/" exact={true} render={() => <Home />} />}
          {!signedIn && (
            <Route path={"/" + uid} exact={true} render={() => <Screen />} />
          )}
          <Route
            path="/getstarted"
            exact={true}
            render={() => <ProviderSignUp />}
          />
        </Router>
      </div>
    );
  }
}
