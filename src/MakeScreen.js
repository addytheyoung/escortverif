import React, { Component } from "react";
import Header from "./Header";
import { Checkbox } from "@material-ui/core";

export default class MakeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: "",
      checkedBoxes: [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    };
  }

  render() {
    const { info, checkedBoxes } = this.state;
    return (
      <div>
        <Header />
        <div>
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
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "30vw" }}>
            <div style={{ marginTop: 50, fontSize: 20, marginBottom: 40 }}>
              What you would like to know (and verify) about your clients?
            </div>

            {this.mainCheckboxComp(
              ["Escora Encounters", "Escora Ratings", "Escora Reviews"],
              "Client encounters are stored with Escora. We show the clients encounters with other providers who used Escora, including ratings, reviews, and total number of encounters. If a client has no Escora history, they may just be new to the platform, but we reccommend checking the (optional) references box below just to be safe.",
              0
            )}
            {this.mainCheckboxComp(
              ["Photo", "Photo Verification"],
              "We verify what your client looks like through a custom pose picture, (What Bumble / Tinder do) and send you that image. Most clients have this verified already, but we ask for a new picture every few months to make sure.",
              2
            )}

            {this.mainCheckboxComp(
              ["Liscense", "Full Legal Name", "Age, Height, Race"],
              "We request an image of your clients liscense. Most clients have this verified already, so it's not too much trouble.",
              3
            )}

            {this.mainCheckboxComp(
              ["Employment", "Official Job Title", "Company Title", "Income"],
              "We verify the official job title, company, and/or income of your client. We HIGHLY reccomend checking job title here, as to make your client isn't working a job that could harm you. We're here to make sure you're safe.",
              5
            )}

            {this.mainCheckboxComp(
              ["Criminal History", "Felonies", "Assult Charges", "Background"],
              "Background check on the client for you safety. We'll run this automatically every screen so you see any changes, and usually don't need any extra info from the client. The screen will take a bit longer with this information, but no less than 10 minutes.",
              8
            )}

            {this.mainCheckboxComp(
              ["Personal Info", "Phone Number", "Address"],
              "We'll get and verify the phone number or address of the client, and send it your way.",
              11
            )}

            {this.mainCheckboxComp(
              ["Social Media (Optional)", "Facebook", "Twitter", "LinkedIn"],
              "Optional social media verification. We'll send you the verified profiles of the accounts they share, along with stats about their likelihood of being safe.",
              13
            )}

            {this.mainCheckboxComp(
              ["Other References (Optional)", "References"],
              "Optional references outside of Escora. This makes for easy client picking if they have references you know.",
              16
            )}
          </div>

          <div
            onClick={() => this.saveChanges()}
            style={{
              padding: 10,
              marginTop: 50,
              width: 100,
              backgroundColor: "rgb(230, 30, 77)",
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: 700,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            SAVE
          </div>
        </div>
        <div style={{ height: 200 }}></div>
      </div>
    );
  }

  // Save the changes selected here.
  saveChanges() {}

  // Update one of the selections.
  updateCheckedBoxes(box) {
    const checkedBoxes = this.state.checkedBoxes;
    checkedBoxes[box] = !checkedBoxes[box];
    this.setState({
      checkedBoxes: checkedBoxes,
    });
  }

  // Nexted Component: The info window we show the user.
  imgWindow(newInfo) {
    const stateInfo = this.state.info;
    return (
      <img
        onClick={() =>
          this.setState({
            info:
              stateInfo === "" ? "Your encounters are stored with Escora" : "",
          })
        }
        onMouseOver={() =>
          this.setState({
            info: newInfo,
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
    );
  }

  // Main box

  mainCheckboxComp(elemArray, windowText, currentIndex) {
    const checkedBoxes = this.state.checkedBoxes;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 30,
          marginBottom: 30,
          justifyContent: "center",
        }}
      >
        <div style={{ width: 240 }}>
          <div style={{ fontWeight: 500, display: "flex" }}>
            <div style={{ width: 165 }}>{elemArray[0]}</div>
            <div style={{ marginLeft: 20 }}>{this.imgWindow(windowText)}</div>
          </div>
          <div style={{ height: 4 }}></div>

          {elemArray.map((elem, index) => {
            if (index === 0) {
              return null;
            }
            const newIndex = (index += currentIndex - 1);
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 150 }}>{elem}</div>

                <Checkbox
                  disabled={newIndex === 0 || newIndex === 1 ? true : false}
                  checked={
                    newIndex === 0 || newIndex === 1
                      ? true
                      : checkedBoxes[newIndex]
                  }
                  onChange={() => this.updateCheckedBoxes(newIndex)}
                />
              </div>
            );
          })}
        </div>

        <div style={{ width: 50 }}></div>
      </div>
    );
  }
}
