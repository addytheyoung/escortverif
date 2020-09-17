import React, { Component } from "react";
import Header from "./Header";

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Uh oh, we didn't find a page for this provider.
          <br /> <br /> Try the link sent to you again, or return to the
          homepage.
        </div>
      </div>
    );
  }
}
