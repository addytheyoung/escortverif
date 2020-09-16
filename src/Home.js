import React, { Component } from "react";
import Header from "./Header";
import "./css/Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div
          style={{ paddingLeft: "20vw", paddingRight: "20vw", marginTop: 80 }}
        >
          <div style={{ width: "30vw" }}>
            <div style={{ fontSize: 32, fontWeight: 500 }}>
              Escorts: Screening clients has never been easier
            </div>
            <div style={{ marginTop: 20 }}>
              Just send your unique Fine link to the client, <br /> and we
              handle the rest.
              {/* <br /> <br />
              Customize your screening process to fit what YOU <br /> need from
              your clients. */}
            </div>
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
              Get started
            </div>
          </div>

          <div
            style={{
              marginTop: 80,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/sketch.svg")}
              />

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Custom Screening
              </div>
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
                Customize info you want verified from your clients! When a new
                client comes, just send them your unqiue Fine link.
              </div>
            </div>
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/calm.svg")}
              />
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Client Comfort
              </div>
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
                We don't store unwanted client info, we're easy (and free) to
                use, and using us guarentees the client that you're real.
              </div>
            </div>
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/thunder.svg")}
              />
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Quick results
              </div>
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
                Within 15 minutes, we send you our calculated safety indicator
                for the client, all info they provided, and what we verified!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
