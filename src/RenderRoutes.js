import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";

export default class RenderRoutes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact={true} render={() => <Home />} />
          {/* <Route path="/profile" exact={true} render={() => <Main />} />
          <Route path="/messages" exact={true} render={() => <Main />} />
          <Route path="/dates" exact={false} render={() => <GirlPage />} /> */}
        </Router>
      </div>
    );
  }
}
