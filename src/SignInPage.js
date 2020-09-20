import React, { Component } from "react";
import Header from "./Header";

export default class SignInPage extends Component {
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 500 }}>Sign in as</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <div
              onClick={() => (window.location.href = "/getstartedclient")}
              id="get-started-button"
              style={{
                backgroundColor: "#008489",
                width: 150,
                padding: 10,
                color: "white",
                fontWeight: "600",
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              A Client
            </div>

            <div style={{ width: 15 }}></div>

            <div
              onClick={() => (window.location.href = "/getstarted")}
              id="get-started-button"
              style={{
                backgroundColor: "rgb(230, 30, 77)",
                width: 150,
                padding: 10,
                color: "white",
                fontWeight: "600",
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              An Escort
            </div>
          </div>
        </div>
      </div>
    );
  }
}
