import React, { Component } from "react";
import Header from "./Header";
import { Input, Checkbox, Select, MenuItem } from "@material-ui/core";
import ProviderInput from "./ProviderInput";
import checkEmail from "./functions/checkEmail";
import * as firebase from "firebase";
import Camera from "react-html5-camera-photo";
import CropImage from "./CropImage";
import { isMobile } from "react-device-detect";
import "react-html5-camera-photo/build/css/index.css";
import "./css/ProviderSignUp.css";
import ProgressBar from "./ProgressBar";
import MakeScreen from "./MakeScreen";

export default class ProviderSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadingPicture: false,
      uploadingFile: true,
      croppingPicture: false,
      currentInput: 3,
      activePictureUri: "",
      activePosePictureUri: "",
      name: "",
      escoraId: "",
      croppedImg: "",
    };
  }

  render() {
    const {
      uploadingPicture,
      uploadingFile,
      croppingPicture,
      currentInput,
      activePictureUri,
      activePosePictureUri,
      name,
      escoraId,
    } = this.state;
    const { profileData } = this.props;

    if (firebase.auth().currentUser) {
      return (
        <div>
          <Header />
          <div style={{ height: 80 }}></div>
          {currentInput === 0 && (
            <ProviderInput
              prevDisabled={true}
              clickPrev={() => this.clickPrev()}
              clickNext={() => this.sendEmail()}
              title={"What's your email?"}
              subTitle={""}
              input={
                <Input
                  id="email-input"
                  style={{ width: 300, fontSize: 18 }}
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
              <div style={{ textAlign: "center", width: "30vw", fontSize: 20 }}>
                We sent you an email! <br /> <br />
                Please click the link to verify it.
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <div style={{ height: 80 }}></div>

          {currentInput === 0 && (
            <div>
              <ProgressBar currentIndex={1} total={3} />

              <ProviderInput
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                prevDisabled={true}
                nextDisabled={name === ""}
                title={"What name do you go by?"}
                subTitle={""}
                input={
                  <Input
                    value={name}
                    onChange={(word) =>
                      this.setState({
                        name: word.target.value,
                      })
                    }
                    style={{ width: 250, fontSize: 18 }}
                    type="text"
                    placeholder="Escort name"
                  />
                }
              />
            </div>
          )}
          {currentInput === 1 && (
            <div>
              <ProgressBar currentIndex={2} total={3} />

              <ProviderInput
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                prevDisabled={false}
                nextDisabled={escoraId === ""}
                title={"Make an Escora id"}
                subTitle={
                  <div>
                    This is the link you send your clients:
                    <div style={{ fontWeight: 600, marginTop: 5 }}>
                      {"escora.io/" + escoraId}
                    </div>
                  </div>
                }
                input={
                  <Input
                    value={escoraId}
                    onChange={(word) => {
                      const value = word.target.value;
                      var letterNumber = /^[0-9a-zA-Z]+$/;

                      if (value.match(letterNumber) || value === "") {
                        this.setState({
                          escoraId: word.target.value.toLocaleLowerCase(),
                        });
                      }
                    }}
                    style={{ width: 250, fontSize: 18 }}
                    type="text"
                    placeholder="Escora id"
                  />
                }
              />
            </div>
          )}

          {currentInput === 2 && (
            <div>
              <ProgressBar currentIndex={3} total={3} />
              <ProviderInput
                prevDisabled={false}
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={activePosePictureUri === "" || croppingPicture}
                title={"Please upload a picture of you"}
                subTitle={
                  "Blurred faces are fine. This is just so your clients can recognize you when visiting your screen."
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
                    {uploadingPicture && (
                      <div
                        id={isMobile ? "camera-mobile" : "camera"}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {!activePosePictureUri && (
                          <Camera
                            onCameraStop={() => console.log("")}
                            oncameraError={() => console.log("")}
                            // isImageMirror={false}
                            // idealFacingMode={"environment"}
                            onTakePhoto={(dataUri) =>
                              this.handleTakePhoto(
                                dataUri,
                                "activePosePictureUri"
                              )
                            }
                          ></Camera>
                        )}
                        <CropImage
                          showCroppedImage={!croppingPicture}
                          showOriginalImage={croppingPicture}
                          setCroppedImg={(croppedImgUrl) =>
                            this.setCroppedImg(croppedImgUrl)
                          }
                          picture={activePosePictureUri}
                        />
                        {croppingPicture && (
                          <div
                            onClick={() =>
                              this.setState({
                                croppingPicture: false,
                              })
                            }
                            id="button"
                            style={{
                              marginTop: 5,
                              borderRadius: 5,
                              backgroundColor: "#008489",
                              color: "white",
                              padding: 10,
                              fontSize: 18,
                              fontWeight: 500,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: 40,
                            }}
                          >
                            DONE CROPPING
                          </div>
                        )}
                        {!croppingPicture && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 18,
                                marginTop: 30,
                                fontWeight: 500,
                              }}
                            >
                              OR
                            </div>
                            <div
                              onClick={() =>
                                this.setState({
                                  uploadingFile: true,
                                  uploadingPicture: false,
                                  activePosePictureUri: "",
                                })
                              }
                              id="button"
                              style={{
                                marginTop: 20,
                                borderRadius: 5,
                                backgroundColor: "#a1a1a1",
                                color: "white",
                                padding: 10,
                                fontSize: 18,
                                fontWeight: 500,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: 170,
                                marginBottom: 40,
                              }}
                            >
                              Upload a photo
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {uploadingFile && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Input
                          id="pic-input"
                          onChangeCapture={() =>
                            this.uploadedImage("activePosePictureUri")
                          }
                          type="file"
                        />
                        <CropImage
                          showCroppedImage={!croppingPicture}
                          showOriginalImage={croppingPicture}
                          setCroppedImg={(croppedImgUrl) =>
                            this.setCroppedImg(croppedImgUrl)
                          }
                          picture={activePosePictureUri}
                        />

                        {croppingPicture && (
                          <div
                            onClick={() =>
                              this.setState({
                                croppingPicture: false,
                              })
                            }
                            id="button"
                            style={{
                              marginTop: 5,
                              borderRadius: 5,
                              backgroundColor: "#008489",
                              color: "white",
                              padding: 10,
                              fontSize: 18,
                              fontWeight: 500,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: 40,
                            }}
                          >
                            DONE CROPPING
                          </div>
                        )}

                        {!croppingPicture && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              marginTop: 20,
                            }}
                          >
                            <div
                              style={{
                                fontSize: 18,
                                fontWeight: 500,
                              }}
                            >
                              OR
                            </div>
                            <div
                              onClick={() =>
                                this.setState({
                                  uploadingFile: false,
                                  uploadingPicture: true,
                                  activePosePictureUri: "",
                                })
                              }
                              id="button"
                              style={{
                                marginTop: 20,
                                borderRadius: 5,
                                backgroundColor: "#a1a1a1",
                                color: "white",
                                padding: 10,
                                fontSize: 18,
                                fontWeight: 500,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 40,
                              }}
                            >
                              Take a picture here
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                }
              />
            </div>
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
              We don't share this information with anyone, and we take as little
              info as possible.
            </div>
          </div>
        </div>
      );
    }
  }

  uploadedImage(state) {
    const ref = document.getElementById("pic-input").files;
    if (ref.length === 0) {
      return;
    }
    const image = ref[0];
    console.log(image);
    const blob = URL.createObjectURL(image);
    if (!image || !blob) {
      return;
    }
    this.setState({ [state]: blob, activeImage: image, croppingPicture: true });
  }

  setCroppedImg(croppedImgUrl) {
    this.setState({
      croppedImg: croppedImgUrl,
    });
  }
  handleTakePhoto(dataUri, type) {
    this.setState({
      [type]: dataUri,
      croppingPicture: true,
    });
  }

  clickPrev() {
    const { currentInput } = this.state;
    this.setState({
      currentInput: currentInput - 1,
    });
  }

  async updateDatabase() {
    const { currentInput, name, escoraId, croppedImg } = this.state;
    const myDocRef = firebase
      .firestore()
      .collection("Providers")
      .doc(firebase.auth().currentUser.uid);

    if (currentInput === 0) {
      await myDocRef.update({
        first_name: name,
      });
    } else if (currentInput === 1) {
      const snapshot = await firebase
        .firestore()
        .collection("Providers")
        .where("escora_id", "==", escoraId)
        .get();
      if (snapshot.empty) {
        await myDocRef.update({
          escora_id: escoraId,
        });
      } else {
        alert("That id is taken.");
        return "error";
      }
    } else if (currentInput === 2) {
      console.log(croppedImg);
      const storageRef = firebase
        .storage()
        .ref()
        .child(firebase.auth().currentUser.uid)
        .child("profile_picture");

      await storageRef.put(croppedImg);
      const url = await storageRef.getDownloadURL();
      await myDocRef.update({
        picture: url,
      });

      window.location.href = "/";
    } else if (currentInput === 3) {
    } else if (currentInput === 4) {
    } else {
    }
  }

  async sendEmail() {
    const email = document.getElementById("email-input").value;
    const { currentInput } = this.state;
    if (currentInput === 0) {
      // Bad email?
      if (!checkEmail(email)) {
        return;
      }
      this.sendSignInLinkToEmail(email);
    }
  }

  // Next button clicked!
  async clickNext() {
    const { currentInput } = this.state;
    // What input are we on?

    const result = await this.updateDatabase();
    if (result !== "error") {
      this.setState({
        currentInput: currentInput + 1,
      });
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
