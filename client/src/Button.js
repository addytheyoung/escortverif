import React, { Component } from "react";

export default class Button extends Component {
  render() {
    const { text, color, click } = this.props;
    return (
      <div
        onClick={() => click()}
        id="get-started-button"
        style={{
          backgroundColor: color === "green" ? "#008489" : "rgb(230, 30, 77)",
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
        {text}
      </div>
    );
  }
}
