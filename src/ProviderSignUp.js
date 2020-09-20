import React, { Component } from "react";
import Header from "./Header";
import { Input } from "@material-ui/core";
import ProviderInput from "./ProviderInput";
import checkEmail from "./functions/checkEmail";
import * as firebase from "firebase";
import Camera from "react-html5-camera-photo";
import CropImage from "./CropImage";

import "react-html5-camera-photo/build/css/index.css";
import "./css/ProviderSignUp.css";

export default class ProviderSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentInput: 0,
      activePictureUri: "",
      activePosePictureUri: "",
    };
  }

  render() {
    const { currentInput, activePictureUri, activePosePictureUri } = this.state;
    const { profileData } = this.props;

    if (profileData) {
    } else {
      return (
        <div>
          <Header />
          <div style={{ height: 50 }}></div>
          {currentInput === 0 && (
            <ProviderInput
              prevDisabled={true}
              clickPrev={() => this.clickPrev()}
              clickNext={() => this.clickNext()}
              title={"What's your escort email?"}
              subTitle={""}
              input={
                <Input
                  id="email-input"
                  style={{ width: 250 }}
                  type="email"
                  placeholder="Email"
                />
              }
            />
          )}

          {currentInput === 1 && (
            <div
              style={{
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100,
              }}
            >
              <div style={{ textAlign: "center", width: "30vw" }}>
                We sent you an email! <br /> <br />
                Please click the link to verify it.
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        {currentInput === 1 && (
          <ProviderInput
            clickPrev={() => this.clickPrev()}
            clickNext={() => this.clickNext()}
            title={"What escort name do you go by?"}
            subTitle={""}
            input={
              <Input
                id="escort-name-input"
                style={{ width: 250 }}
                type="text"
                placeholder="Escort name"
              />
            }
          />
        )}

        {currentInput === 2 && (
          <ProviderInput
            clickPrev={() => this.clickPrev()}
            clickNext={() => this.clickNext()}
            nextDisabled={activePictureUri === ""}
            title={"Please upload a picture of you"}
            subTitle={
              "Blurred faces are fine. This is just so your clients can recognize you. Nobody except your clients can see this picture."
            }
            input={
              <div>
                <Input
                  onChangeCapture={() => this.uploadedImage()}
                  id="pic-input"
                  style={{ width: 250 }}
                  type="file"
                />

                <CropImage
                  setCroppedImg={(croppedImgUrl) =>
                    this.setCroppedImg(croppedImgUrl)
                  }
                  picture={activePictureUri}
                />

                {/* {activePictureUri !== "" && (
                  <div>
                    <img style={{ width: 220 }} src={activePictureUri} />
                  </div>
                )} */}
              </div>
            }
          />
        )}

        {currentInput === 3 && (
          <ProviderInput
            clickPrev={() => this.clickPrev()}
            clickNext={() => this.clickNext()}
            nextDisabled={activePosePictureUri === ""}
            title={"Please copy the pose and upload"}
            subTitle={
              "Blurred faces are fine. This is only used for our verification, and is deleted right after we verify you are real."
            }
            input={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <Input
                    onChangeCapture={() => this.uploadedImage()}
                    id="pic-input"
                    style={{ width: 250 }}
                    type="file"
                  />
                </div>
                <div>OR</div>
                <div id="camera">
                  <Camera
                    id="camera"
                    onCameraStop={() => console.log("")}
                    oncameraError={() => console.log("")}
                    // isImageMirror={false}
                    // idealFacingMode={"environment"}
                    onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)}
                  ></Camera>
                </div>

                {activePosePictureUri !== "" && (
                  <div>
                    <img style={{ width: 220 }} src={activePosePictureUri} />{" "}
                  </div>
                )}
              </div>
            }
          />
        )}

        <div
          style={{
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 100,
          }}
        >
          <div style={{ textAlign: "center", width: "30vw", fontSize: 12 }}>
            We don't share this information with anyone. We use this just to
            make sure you're real, and we take as little info as possible.
          </div>
        </div>
      </div>
    );
  }

  uploadedImage() {
    const ref = document.getElementById("pic-input").files;
    var stateRef = "activePictureUri";
    if (this.state.currentInput == 3) {
      stateRef = "activePosePictureUri";
    }
    if (ref.length === 0) {
      this.setState({
        [stateRef]: "",
      });
      return;
    }
    const image = ref[0];
    const blob = URL.createObjectURL(image);
    if (!image || !blob) {
      return;
    }

    this.setState({ [stateRef]: blob });
  }

  setCroppedImg(croppedImgUrl) {
    this.setState({
      croppedImg: croppedImgUrl,
    });
  }

  handleTakePhoto(dataUri) {
    this.setState({
      activePosePictureUri: dataUri,
    });
  }

  clickPrev() {
    const { currentInput } = this.state;
    this.setState({
      currentInput: currentInput - 1,
    });
  }

  // Next button clicked!
  clickNext() {
    const { currentInput } = this.state;
    // What input are we on?
    if (currentInput === 0) {
      const email = document.getElementById("email-input").value;
      // Bad email?
      if (!checkEmail(email)) {
        return;
      }
      this.sendSignInLinkToEmail(email);
    } else if (currentInput === 1) {
    }
  }

  // Send the sign in link to our email
  sendSignInLinkToEmail(email) {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: "https://escora.io/verifyemail?email=" + email,
      // This must be true.
      handleCodeInApp: true,
    };
    // Get our actioncode settings
    // Send the link in the email
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("email", email);
        this.setState({
          currentInput: this.state.currentInput + 1,
        });
      })
      .catch((e) => {
        console.log(e.message);
        alert("Something happened. Try again.");
      });
  }
}
