import React, { Component } from "react";
import "./css/ProgressBar.css";

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { currentIndex, total } = this.props;
    const width = ((currentIndex * 1.0) / total) * 100 + "%";
    return (
      <div
        id="progress-bar"
        style={{
          height: 5,
          width: [width],
          backgroundColor: "#008489",
          borderRadius: 5,
          position: "fixed",
          top: 81,
        }}
      ></div>
    );
  }
}
