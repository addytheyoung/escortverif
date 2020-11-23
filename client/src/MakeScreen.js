import React, { Component } from "react";
import Header from "./Header";
import { Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import * as firebase from "firebase";
import Modal from "./Modal";

export default class MakeScreen extends Component {
  counter = -1;
  constructor(props) {
    super(props);

    const { profileData } = this.props;
    console.log(profileData);

    this.state = {
      info: "",
      checkedBoxes: [
        true,
        true,
        true,
        profileData.client_age,
        profileData.client_race,
        profileData.client_verify_about,
        profileData.client_references,
        profileData.client_references_skip,
        profileData.client_verify_photo,
        profileData.client_job,
        profileData.client_company,
        profileData.client_linkedin,
        profileData.client_verify_employment,
        profileData.client_felonies,
        profileData.client_assult_charges,
        profileData.client_facebook,
        profileData.client_twitter,
        profileData.client_instagram,
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
            <div>
              <Modal
                closeModal={() =>
                  this.setState({
                    info: "",
                  })
                }
                modalContent={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: isMobile ? "5vw" : "5vw",
                      paddingRight: isMobile ? "5vw" : "5vw",
                    }}
                  >
                    <div style={{ fontSize: 18, marginTop: 20 }}>{info}</div>
                  </div>
                }
              />
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
          <div
            style={{
              marginTop: 120,
              fontSize: 28,
              marginBottom: 60,
              fontWeight: 500,
              width: isMobile ? "90vw" : "60vw",
              textAlign: "center",
            }}
          >
            What would you like to know (and verify) about your clients?
          </div>
          <div
            style={{
              width: isMobile ? "100vw" : "60vw",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {this.mainCheckboxComp(
              ["Given", "Escora Ratings & Reviews", "Phone Number"],
              "Client encounters are stored with Escora. We show the clients encounters with other providers who used Escora, including ratings & reviews of the client from the other providers. (Don't worry: client's don't rate or review providers) If a client has no Escora history, they may just be new to the platform, but we reccommend checking the references box below just to be safe. We also require a verified phone number for the client to begin. Phone number is the only thing Escora requires. The rest is up to you!",
              0
            )}

            <div style={{ height: 40 }}></div>

            {this.mainCheckboxComp(
              [
                "About",
                "First + Last Name",
                "Age",
                "Race",
                "Want 'About' verified?",
              ],
              "Just some basic info about your client. Most clients have this verified already, but if not, to verify we request a liscense or some other form of identification. If you don't want this info verified, (a bit easier for the client) we just send you the info the client gives us, which may or may not be true.",
              2
            )}
            <div style={{ height: 40 }}></div>

            {this.mainCheckboxComp(
              ["References", "References"],
              "Optional references outside of Escora. If you choose to check quick submit, your client is done after they enter references. You'll have the references, along with any info you see checked above.",
              6,
              true
            )}

            <div style={{ height: 40 }}></div>

            {this.mainCheckboxComp(
              ["Photo", "Photo Verification"],
              "We verify what your client looks like through a custom pose picture. Most clients have this verified already, but we ask for a new picture every few months to make sure.",
              8
            )}

            <div style={{ height: 40 }}></div>

            {this.mainCheckboxComp(
              [
                "Employment",
                "Official Job Title",
                "Company",
                "LinkedIn",
                "Want 'Employment' verified?",
              ],
              "The official job title, company, and/or LinkedIn of your client. We HIGHLY reccomend checking job title here, along with us verifying it, as to make your client isn't working a job that could harm you. We're here to make sure you're safe.",
              9
            )}

            <div style={{ height: 40 }}></div>

            {this.mainCheckboxComp(
              ["Criminal History", "Felonies", "Assult Charges"],
              "Background check on the client for you safety. We'll run this automatically every screen so you see any changes, and usually don't need any extra info from the client. The screen will take a bit longer with this information, but no less than 10 minutes.",
              13
            )}

            <div style={{ height: 40 }}></div>

            {this.mainCheckboxComp(
              ["Social Media", "Facebook", "Twitter", "Instagram"],
              "Optional social media. We'll send you the profiles of the accounts they share.",
              15
            )}

            <div style={{ height: 40 }}></div>

            {this.mainCheckboxComp(
              [
                "STD's",
                "HIV",
                "Herpes",
                "Chlamydia",
                "Ghonnorhea",
                "Want STD's verified?",
              ],
              "We'll have this soon. We'll let you know when it's ready, and you can verify your clients cleanliness!",
              18
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
  async saveChanges() {
    const { checkedBoxes } = this.state;
    var uid = firebase.auth().currentUser.uid;

    await firebase
      .firestore()
      .collection("Providers")
      .doc(uid)
      .update({
        client_escora_ratings: checkedBoxes[0],
        client_escora_reviews: checkedBoxes[0],
        client_phone: checkedBoxes[1],
        client_name: true,
        client_age: checkedBoxes[3],
        client_race: checkedBoxes[4],
        client_verify_about: !!checkedBoxes[5],
        client_references: checkedBoxes[6],
        client_references_skip: checkedBoxes[7],
        client_verify_photo: !!checkedBoxes[8],
        client_job: checkedBoxes[9],
        client_company: checkedBoxes[10],
        client_linkedin: checkedBoxes[11],
        client_verify_employment: !!checkedBoxes[12],
        client_felonies: checkedBoxes[13],
        client_assult_charges: checkedBoxes[14],
        client_facebook: checkedBoxes[15],
        client_twitter: checkedBoxes[16],
        client_instagram: checkedBoxes[17],
        client_stds: [false, false, false, false],
        client_verify_stds: false,
      });

    window.location.reload();
  }

  // Update one of the selections.
  updateCheckedBoxes(box) {
    const { checkedBoxes } = this.state;
    checkedBoxes[box] = !checkedBoxes[box];

    if ((box === 2 || box === 3 || box === 4) && checkedBoxes[5] == null) {
      checkedBoxes[5] = true;
    } else if (!checkedBoxes[2] && !checkedBoxes[3] && !checkedBoxes[4]) {
      checkedBoxes[5] = null;
    }

    if ((box === 9 || box === 10 || box === 11) && checkedBoxes[12] == null) {
      checkedBoxes[12] = true;
    } else if (!checkedBoxes[9] && !checkedBoxes[10] && !checkedBoxes[11]) {
      checkedBoxes[12] = null;
    }

    if (box === 6) {
      checkedBoxes[7] = !checkedBoxes[7];
    }
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
            info: stateInfo === "" ? newInfo : "",
          })
        }
        style={{ width: 20, height: 20, cursor: "pointer" }}
        src={require("./images/info.svg")}
      />
    );
  }

  // Main box

  mainCheckboxComp(elemArray, windowText, currentIndex, secondCheckbox) {
    const checkedBoxes = this.state.checkedBoxes;

    return (
      <div
        style={{
          display: "flex",
          marginBottom: 30,
          marginTop: 30,
          width: isMobile ? "80vw" : "25vw",
          minWidth: 240,
          justifyContent: "center",
        }}
      >
        <div style={{ width: 240 }}>
          <div style={{ fontWeight: 500, display: "flex" }}>
            <div style={{ width: 189, fontSize: 18 }}>{elemArray[0]}</div>
            <div style={{ marginLeft: 20 }}>{this.imgWindow(windowText)}</div>
          </div>
          <div style={{ height: 4 }}></div>

          {elemArray.map((elem, index) => {
            if (index === 0) {
              return null;
            }
            const newIndex = (index += currentIndex - 1);

            if (newIndex === 5 || newIndex === 12) {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: 200 }}>{elem}</div>

                  {this.checkboxComp(newIndex)}
                </div>
              );
            }

            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 200 }}>{elem}</div>

                <Checkbox
                  disabled={
                    newIndex === 0 ||
                    newIndex === 1 ||
                    newIndex === 2 ||
                    newIndex >= 18
                      ? true
                      : false
                  }
                  checked={checkedBoxes[newIndex]}
                  onChange={() => this.updateCheckedBoxes(newIndex)}
                />
              </div>
            );
          })}

          {secondCheckbox && checkedBoxes[6] && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: 200 }}>
                Quick submit if they have references?
              </div>

              <Checkbox
                onChange={() => this.updateCheckedBoxes(7)}
                checked={checkedBoxes[7]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  checkboxComp(newIndex) {
    const { checkedBoxes } = this.state;

    var disabled = false;
    if (newIndex === 5) {
      disabled = !checkedBoxes[2] && !checkedBoxes[3] && !checkedBoxes[4];
    } else if (newIndex === 12) {
      disabled = !checkedBoxes[9] && !checkedBoxes[10] && !checkedBoxes[11];
    }
    const BlueCheckbox = withStyles({
      root: {
        color: "#008489",
        "&$checked": {
          color: "#008489",
        },
      },
      checked: {},
    })((props) => (
      <Checkbox
        color="default"
        {...props}
        disabled={disabled}
        checked={checkedBoxes[newIndex]}
        onChange={() => this.updateCheckedBoxes(newIndex)}
      />
    ));
    return <BlueCheckbox />;
  }
}
