import React, { Component } from "react";
import "./css/Header.css";
import * as firebase from "firebase";
import { isMobile } from "react-device-detect";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileModal: false,
    };
  }

  render() {
    const { margin } = this.props;
    const signedIn = !!firebase.auth().currentUser;
    return (
      <div
        style={{
          height: 80,
          width: "100vw",
          backgroundColor: "#ffffff",
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          borderBottomColor: "#f1f1f1",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 999,
        }}
      >
        <div
          onClick={function () {
            window.location.href = "/";
          }}
          id="header-link"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isMobile && (
            <div style={{ width: margin ? [margin] : "20vw" }}></div>
          )}
          {isMobile && <div style={{ width: margin ? [margin] : "5vw" }}></div>}
          <img
            src={require("./images/butterfly.svg")}
            style={{ width: isMobile ? 40 : 70, height: isMobile ? 40 : 70 }}
          ></img>
          <div style={{ marginLeft: 10, fontSize: isMobile ? 18 : 20 }}>
            Escora
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            marginRight: margin ? [margin] : isMobile ? "5vw" : "20vw",
          }}
        >
          <div
            onClick={function () {
              window.location.href = "/about";
            }}
            id="header-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={require("./images/info.svg")}
              style={{ height: isMobile ? 30 : 35, width: isMobile ? 30 : 35 }}
            />
            {!isMobile && (
              <div style={{ marginLeft: 5, fontSize: 18 }}>About</div>
            )}
          </div>

          <div
            onClick={function () {
              window.location.href = "profile";
            }}
            id="header-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                height: isMobile ? 30 : 35,
                width: isMobile ? 30 : 35,
                marginLeft: 20,
              }}
              src={require("./images/user.svg")}
            />
            {signedIn && !isMobile && (
              <div style={{ marginLeft: 5, fontSize: 18 }}>Profile</div>
            )}
            {!signedIn && !isMobile && (
              <div style={{ marginLeft: 5, fontSize: 18 }}>Sign in</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
