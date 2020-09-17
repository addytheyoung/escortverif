import React, { Component } from "react";
import "./css/LoadingPage.css";

export default class LoadingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
      random: Math.random(),
    };
  }

  render() {
    const random = this.state.random;
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <img id="treasure" src={require("./images/butterfly.svg")}></img>
        {random < 0.2 && (
          <div
            style={{
              fontSize: 24,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Welcome to Escora!
          </div>
        )}
        {random >= 0.2 && random < 0.4 && (
          <div
            style={{
              fontSize: 24,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Making lunch...
          </div>
        )}
        {random >= 0.4 && random < 0.6 && (
          <div
            style={{
              fontSize: 24,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Finding true love...
          </div>
        )}
        {random >= 0.6 && random < 0.8 && (
          <div
            style={{
              fontSize: 24,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Grabbing my scanner...
          </div>
        )}
        {/* {random >= 0.8 && random < 0.9 && (
          <div
            style={{
              fontFamily: 'Gill Sans',
              fontSize: 26,
              marginBottom: 30,
              marginTop: '1%',
              fontWeight: '500',
            }}>
            Building a Crate...
          </div>
        )} */}
        {random >= 0.8 && (
          <div
            style={{
              fontSize: 24,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Looking for my wings...
          </div>
        )}
      </div>
    );
  }
}
