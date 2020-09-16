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
      currentInput: 3,
      activePosePictureUri: "",
    };
  }

  render() {
    const { currentInput, activePosePictureUri } = this.state;
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

        {/* {currentInput === 1 && (
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
        )} */}

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
            nextDisabled={false}
            title={"Please upload a picture of you"}
            subTitle={
              "Blurred faces are fine. This is just so your clients can recognize you. Nobody except your clients can see this picture."
            }
            input={<Input id="name-input" style={{ width: 250 }} type="file" />}
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
              <div>
                <div>
                  <Input
                    onChangeCapture={() => this.uploadedImage()}
                    id="name-input"
                    style={{ width: 250 }}
                    type="file"
                  />
                </div>
                <div>OR</div>
                <Camera
                  onCameraStop={() => console.log("")}
                  oncameraError={() => console.log("")}
                  // isImageMirror={false}
                  // idealFacingMode={"environment"}
                  onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)}
                ></Camera>

                {activePosePictureUri !== "" && (
                  <div>
                    <img src={activePosePictureUri} />
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
    const ref = document.getElementById("name-input").files;
    if (ref.length === 0) {
      this.setState({
        activePosePictureUri: "",
      });
      return;
    }
    const image = ref[0];
    const blob = URL.createObjectURL(image);
    if (!image || !blob) {
      return;
    }

    this.setState({ activePosePictureUri: blob });
  }

  setCroppedImg(croppedImgUrl) {
    console.log(croppedImgUrl);
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
      //   this.sendSignInLinkToEmail(email);
    } else if (currentInput === 1) {
    }

    this.setState({
      currentInput: currentInput + 1,
    });
  }

  // Send the sign in link to our email
  sendSignInLinkToEmail(email) {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: "https://escverif.web.app/email?=" + email,
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
