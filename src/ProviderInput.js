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
          <div style={{ fontSize: 22, fontWeight: 500 }}>{title}</div>
          <div
            style={{
              marginTop: 15,
              fontSize: 12,
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
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: "#f1f1f1",
                opacity: prevDisabled ? 0.4 : 1,
                color: "black",
                fontWeight: 500,
                cursor: prevDisabled ? "inherit" : "pointer",
                borderRadius: 5,
              }}
            >
              Prev
            </div>
            <div style={{ width: 10 }}></div>
            <div
              onClick={() => this.next()}
              style={{
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: "rgb(230, 30, 77)",
                opacity: nextDisabled ? 0.4 : 1,
                color: "white",
                fontWeight: 500,
                cursor: nextDisabled ? "inherit" : "pointer",
                borderRadius: 5,
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