import React, { Component } from "react";
import Header from "./Header";

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { client } = this.props;
    return (
      <div>
        <Header />
        {!client && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 160,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Uh oh, we didn't find a page for this provider.
            <br /> <br /> Try the link sent to you again, or return to the
            homepage.
          </div>
        )}

        {client && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 160,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Uh oh, we didn't find a page for this client, or you don't have
            permission. <br /> <br /> Try signing into your account, or try the
            link sent to you again, or return to the homepage.
          </div>
        )}
      </div>
    );
  }
}
