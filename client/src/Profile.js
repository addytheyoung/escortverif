import React, { Component } from "react";
import Header from "./Header";
import * as firebase from "firebase";

export default class Profile extends Component {
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
            marginLeft: "20vw",
            marginRight: "20vw",
            display: "flex",
            flexDirection: "column",
            marginTop: 120,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="button"
            onClick={() => this.logout()}
            style={{
              padding: 10,
              width: 150,
              height: 40,
              fontSize: 18,
              backgroundColor: "#a1a1a1",
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
            LOGOUT
          </div>
        </div>
      </div>
    );
  }

  logout() {
    const conf = window.confirm("Are you sure you want to logout?");

    if (conf) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.setItem("client", "false");
          localStorage.setItem("provider", "false");
          window.location.href = "/";
        });
    } else {
    }
  }
}
