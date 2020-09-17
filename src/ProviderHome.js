import React, { Component } from "react";
import Header from "./Header";
import { Input } from "@material-ui/core";
import "./css/ProviderHome.css";

import { WhatsappShareButton } from "react-share";

export default class ProviderHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: "",
    };
  }

  render() {
    const { info } = this.state;
    return (
      <div>
        <Header />
        {info !== "" && (
          <div
            style={{
              position: "fixed",
              top: 100,
              left: 50,
              width: 300,
              height: 200,
              backgroundColor: "#ffffff",
              borderRadius: 5,
              borderStyle: "solid",
              borderColor: "lightgray",
              fontSize: 12,
              padding: 10,
            }}
          >
            {info}
          </div>
        )}
        <div style={{ paddingLeft: "20vw", paddingRight: "20vw" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Input
              id="unique-url"
              style={{ width: 300 }}
              type="text"
              value={"escora.io/lisali48"}
            ></Input>
            <div style={{ marginTop: 20, fontSize: 12, width: 300 }}></div>

            <img
              onClick={() =>
                this.setState({
                  info:
                    info === ""
                      ? "Share this page (or this link, they're the same) with a client to screen them! Since you're logged in to your profile, you're seeing this instead of the screen."
                      : "",
                })
              }
              onMouseOver={() =>
                this.setState({
                  info:
                    "Share this page (or this link, they're the same) with a client to screen them! Since you're logged in to your profile, you're seeing this instead of the screen.",
                })
              }
              onMouseLeave={() =>
                this.setState({
                  info: "",
                })
              }
              style={{ width: 20, height: 20, cursor: "pointer" }}
              src={require("./images/info.svg")}
            />
            <div
              id="copy-url"
              onClick={() => this.copyUrl()}
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
                marginTop: 20,
              }}
            >
              Copy
            </div>
            <div style={{ fontSize: 12, marginTop: 20, marginBottom: 20 }}>
              OR
            </div>
            <div
              onClick={() => (window.location.href = "makescreen")}
              id="copy-url"
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
              }}
            >
              Edit my Screen
            </div>
          </div>
        </div>
      </div>
    );
  }

  copyUrl() {
    const url = document.getElementById("unique-url");
    url.select();
    url.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }
}
