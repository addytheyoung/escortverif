import React, { Component } from "react";
import { Input } from "@material-ui/core";

export default class ProviderInput extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, input, prevDisabled, nextDisabled, subTitle } = this.props;
    return (
      <div>
        <div
          style={{
            marginTop: 50,
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 500 }}>{title}</div>
          <div
            style={{
              marginTop: 20,
              fontSize: 16,
              width: "30vw",
              textAlign: "center",
            }}
          >
            {subTitle}
          </div>
          <div style={{ marginTop: 40 }}>{input}</div>
          <div style={{ display: "flex", marginTop: 20 }}>
            <div
              onClick={() => this.prev()}
              style={{
                padding: 15,
                paddingLeft: 25,
                paddingRight: 25,
                backgroundColor: "#f1f1f1",
                opacity: prevDisabled ? 0.4 : 1,
                color: "black",
                fontWeight: 600,
                cursor: prevDisabled ? "inherit" : "pointer",
                borderRadius: 5,
                fontSize: 18,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Prev
            </div>
            <div style={{ width: 10 }}></div>
            <div
              onClick={() => this.next()}
              style={{
                padding: 15,
                paddingLeft: 25,
                paddingRight: 25,
                backgroundColor: "rgb(230, 30, 77)",
                opacity: nextDisabled ? 0.4 : 1,
                color: "white",
                fontWeight: 600,
                cursor: nextDisabled ? "inherit" : "pointer",
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 18,
              }}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    );
  }

  prev() {
    if (this.props.prevDisabled) {
      return;
    }

    this.props.clickPrev();
  }

  next() {
    this.props.clickNext();
  }
}
