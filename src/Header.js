import React, { Component } from "react";
import "./css/Header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileModal: false,
    };
  }

  render() {
    const { openPage, homePage } = this.props;
    return (
      <div
        style={{
          height: 60,
          width: "100vw",
          backgroundColor: "#ffffff",
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          borderBottomColor: "#f1f1f1",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          onClick={function () {
            window.history.replaceState(null, null, "/");
            openPage("home");
          }}
          id="header-link"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "20vw" }}></div>
          <img
            src={require("./images/butterfly.svg")}
            style={{ width: 50, height: 50 }}
          ></img>
          <div style={{ marginLeft: 10 }}>fine</div>
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
            marginRight: "20vw",
          }}
        >
          <div
            onClick={function () {
              window.history.replaceState(null, null, "/about");
              openPage("about");
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
              style={{ height: 25, width: 25 }}
            />
            <div style={{ marginLeft: 5, fontSize: 14 }}>About</div>
          </div>

          <div
            onClick={function () {
              window.history.replaceState(null, null, "/profile");
              openPage("profile");
            }}
            id="header-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ height: 25, width: 25, marginLeft: 20 }}
              src={require("./images/user.svg")}
            />
            <div style={{ marginLeft: 5, fontSize: 14 }}>Profile</div>
          </div>
        </div>
      </div>
    );
  }
}
