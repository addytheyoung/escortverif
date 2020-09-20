import React, { Component } from "react";
import Header from "./Header";

export default class About extends Component {
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
          }}
        >
          <div>SS</div>
        </div>
      </div>
    );
  }
}
