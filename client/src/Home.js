import React, { Component } from "react";
import Header from "./Header";
import "./css/Home.css";
import { isMobile } from "react-device-detect";
import "./api";
import api from "./api";

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
          style={{
            paddingLeft: isMobile ? "5vw" : "20vw",
            paddingRight: isMobile ? "5vw" : "20vw",
            marginTop: isMobile ? 120 : 140,
          }}
        >
          <div style={{ width: isMobile ? "90vw" : "30vw" }}>
            <div style={{ fontSize: 36, fontWeight: 500 }}>
              Escorts: Screening clients has never been easier
            </div>
            <div style={{ marginTop: 20, fontSize: 18 }}>
              Just send your unique Escora link to the client, and we handle the
              rest.
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
                  width: 180,
                  padding: 10,
                  color: "white",
                  fontWeight: "600",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                  fontSize: 20,
                  height: 40,
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
                  width: 180,
                  padding: 10,
                  color: "white",
                  fontWeight: "600",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                  fontSize: 20,
                  height: 40,
                }}
              >
                I'm an escort
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: isMobile ? 40 : 80,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: isMobile ? "90vw" : "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: isMobile ? 30 : 0,
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/sketch.svg")}
              />

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Custom Screening
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                Customize the info you want from your clients! When a new client
                comes, just send them your unqiue Escora link, and we handle the
                rest.
              </div>
            </div>
            <div
              style={{
                width: isMobile ? "90vw" : "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: isMobile ? 30 : 0,
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/calm.svg")}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Client Comfort
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                For your clients, Escora is simple and free to use. We're
                obsessed with privacy, and using us guarentees the client you're
                real.
              </div>
            </div>
            <div
              style={{
                width: isMobile ? "90vw" : "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: isMobile ? 30 : 0,
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/thunder.svg")}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Quick results
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                Within 0-15 minutes, we send you the clients full profile, with
                what we verified, and ratings of the client from other escorts!
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 80 }}></div>
      </div>
    );
  }
}
