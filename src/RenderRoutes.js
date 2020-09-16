import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import ProviderSignUp from "./ProviderSignUp";

export default class RenderRoutes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact={true} render={() => <Home />} />
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
