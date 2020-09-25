import React, { Component } from "react";
import close from "./images/close.png";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { modalContent } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          // alignItems: "center"
        }}
      >
        <div
          onClick={() => this.closeModal()}
          style={{
            backgroundColor: "#000000",
            opacity: 0.5,
            zIndex: 9999,
            width: "100vw",
            height: "100vh",
            position: "fixed",
          }}
        ></div>
        <div
          style={{
            width: "65vw",
            borderRadius: 5,
            height: "85vh",
            top: 30,
            backgroundColor: "#f5f5f5",
            position: "fixed",
            zIndex: 10000,
            opacity: 1,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <img
                id="close"
                onClick={() => this.closeModal()}
                src={close}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 15,
                  marginRight: 15,
                  cursor: "pointer",
                }}
              />
            </div>
            {modalContent}
          </div>
        </div>
      </div>
    );
  }

  closeModal() {
    const { closeModal } = this.props;
    closeModal();
  }
}
