import React, { Component } from "react";
import Header from "./Header";

export default class Screen extends Component {
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
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "60vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <img style={{ width: 200 }} src={require("./images/girl.png")} />

            <div style={{ width: 50 }}></div>

            <div style={{ width: "25vw" }}>
              <div
                style={{
                  fontSize: 24,
                  marginBottom: 30,
                }}
              >
                Secure, safe, & private client screen <br />
                for Lisa
              </div>
              <div style={{ fontSize: 12 }}>
                We just need some info to make sure Lisa is safe with you.
                <br /> <br />
                The photo on the left has been hand verified by us as Lisa, so
                you have nothing to worry about. <br /> <br />
                This takes just a few minutes, it's (obviously) free, we don't
                <br /> store any data you don't want us to.. <br /> <br />
                <b>And we don't share data with ANYONE. Period.</b>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 20, marginTop: 60 }}>
            Satisfied? Let's get started!
          </div>
          <div
            onClick={() => this.startScreen()}
            id="get-started-button"
            style={{
              padding: 10,
              width: 100,
              backgroundColor: "rgb(230, 30, 77)",
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: 600,
              textAlign: "center",
              marginTop: 30,
            }}
          >
            START
          </div>
        </div>
      </div>
    );
  }

  startScreen() {}
}
