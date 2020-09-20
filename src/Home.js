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
          style={{ paddingLeft: "20vw", paddingRight: "20vw", marginTop: 120 }}
        >
          <div style={{ width: "30vw" }}>
            <div style={{ fontSize: 32, fontWeight: 500 }}>
              Escorts: Screening clients has never been easier
            </div>
            <div style={{ marginTop: 20 }}>
              Just send your unique Escora link to the client, <br /> and we
              handle the rest.
              {/* <br /> <br />
              Customize your screening process to fit what YOU <br /> need from
              your clients. */}
            </div>

            <div style={{ display: "flex" }}>
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
                I'm a client
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
                I'm an escort
              </div>
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
                Customize the info you want from your clients! When a new client
                comes, just send them your unqiue Escora link, and we handle the
                rest.
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
                For your clients, Escora is simple and free to use. We're
                obsessed with privacy, and using us guarentees the client you're
                real.
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
                Within 0-15 minutes, we send you the clients full profile, with
                what we verified, and ratings of the client from other escorts!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
