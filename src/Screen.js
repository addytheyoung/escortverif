import React, { Component } from "react";
import Header from "./Header";
import ProviderInput from "./ProviderInput";
import { Input, Checkbox } from "@material-ui/core";
import Camera from "react-html5-camera-photo";
import CropImage from "./CropImage";
import * as firebase from "firebase";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import ProgressBar from "./ProgressBar";
import ReferenceInput from "./ReferenceInput";

export default class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: "",
      activeQuestion: 3,
      deleteItems: [false, false, false, false, false, false],
      activeInput1: "+1",
      activeInput2: "",
      errorPage: false,
      providerData: false,
      activePosePictureUri: "",
      activeLiscenseUri: "",
      jobTitle: "",
      employerTitle: "",
      employerCity: "",
      linkedinProfile: "",
      activePaystubUri: "",
      numReferences: [],
    };

    // 1) Signed out + invalid provider, render: ErrorPage
    // 2) Signed in + invalid provider, render: ErrorPage
    // 3) Signed out + valid provider, render: activeQuestion: 0
    // 4) Signed in + valid provider, render: activeQuestion: x

    this.pullProviderData();
  }

  render() {
    const {
      info,
      activeQuestion,
      errorPage,
      providerData,
      activeInput1,
      activeInput2,
      activePosePictureUri,
      activeLiscenseUri,
      deleteItems,
      jobTitle,
      employerTitle,
      employerCity,
      linkedinProfile,
      activePaystubUri,
      numReferences,
    } = this.state;
    const { profileData } = this.props;

    if (errorPage) {
      return <ErrorPage />;
    } else if (!providerData) {
      return (
        <div>
          <LoadingPage />
        </div>
      );
    } else if (!profileData) {
      // Signed in!
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

          {activeQuestion === 0 && (
            <div>
              <ProgressBar currentIndex={1} total={4} />
              <ProviderInput
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={activePosePictureUri === ""}
                title={"Please copy the pose and upload"}
                subTitle={
                  "This is only used for Lisa's verification of what you look like. Nobody can see this except providers you choose to share it with."
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
                        <img
                          style={{ width: 260 }}
                          src={activePosePictureUri}
                        />{" "}
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        onChange={() => this.updateCheckedBoxes(0)}
                        checked={deleteItems[0]}
                      ></Checkbox>
                      <div>I want this deleted after Lisa views it.</div>
                    </div>
                  </div>
                }
              />
            </div>
          )}

          {activeQuestion === 1 && (
            <div>
              <ProgressBar currentIndex={2} total={4} />
              <ProviderInput
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={activeLiscenseUri === ""}
                title={"Please upload a picture of your liscense"}
                subTitle={
                  "This is so we can verify your name, race, and age for " +
                  providerData.first_name +
                  "."
                }
                input={
                  <div>
                    <Input
                      id="pic-input"
                      onChangeCapture={() =>
                        this.uploadedImage("activeLiscenseUri")
                      }
                      type="file"
                    />

                    {activeLiscenseUri !== "" && (
                      <div>
                        <img style={{ width: 260 }} src={activeLiscenseUri} />{" "}
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        onChange={() => this.updateCheckedBoxes(1)}
                        checked={deleteItems[1]}
                      ></Checkbox>
                      <div>
                        {"I want this deleted after " +
                          providerData.first_name +
                          " views it."}
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          )}

          {activeQuestion === 2 && (
            <div>
              <ProgressBar currentIndex={3} total={4} />
              <ProviderInput
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={
                  activePaystubUri === "" &&
                  (jobTitle === "" ||
                    employerTitle === "" ||
                    employerCity === "")
                }
                title={"Employment"}
                subTitle={
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14 }}>
                      We want to make sure Lisa is safe with you.
                    </div>
                    <br />
                    1. Linkedin is required if you have one. If not, we may
                    contact to verify your employment. <br /> <br />
                    2. We NEVER say who we are or what we do if we need to reach
                    out, even if they ask. Everything is confidential.
                    <br /> <br />
                    3. We have to save this information so we don't ever need to
                    do this again!
                    <br /> <br />
                    4. See our sample here:
                    <div style={{ marginTop: 10, marginRight: 5 }}></div>
                    {this.imgWindow(
                      "Hello, we're looking for HR to verify [Andrew Young]'s employment as a [Your job] at [Your company]."
                    )}
                  </div>
                }
                input={
                  <div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Input
                        onChange={(word) =>
                          this.setState({
                            jobTitle: word.target.value,
                          })
                        }
                        value={jobTitle}
                        placeholder="Job Title"
                        style={{ width: 260 }}
                      />
                      <div style={{ height: 20 }}></div>
                      <Input
                        onChange={(word) =>
                          this.setState({
                            employerTitle: word.target.value,
                          })
                        }
                        value={employerTitle}
                        placeholder="Employer Name"
                        style={{ width: 260 }}
                      />
                      <div style={{ height: 20 }}></div>
                      <Input
                        onChange={(word) =>
                          this.setState({
                            employerCity: word.target.value,
                          })
                        }
                        value={employerCity}
                        placeholder="Employer City, State"
                        style={{ width: 260 }}
                      />
                      <div style={{ height: 20 }}></div>
                      <Input
                        onChange={(word) =>
                          this.setState({
                            linkedinProfile: word.target.value,
                          })
                        }
                        value={linkedinProfile}
                        placeholder="Linkedin (Optional)"
                        style={{ width: 260 }}
                      />
                      <div
                        style={{
                          marginTop: 20,
                          marginBottom: 20,
                          fontWeight: 500,
                        }}
                      >
                        OR
                      </div>
                      <div style={{ fontWeight: 500, marginBottom: 10 }}>
                        PayStub / W2 Picture
                      </div>
                      <Input
                        id="pic-input"
                        onChangeCapture={() =>
                          this.uploadedImage("activePaystubUri")
                        }
                        type="file"
                      />
                      {activePaystubUri !== "" && (
                        <div>
                          <img style={{ width: 260 }} src={activePaystubUri} />{" "}
                        </div>
                      )}
                    </div>
                  </div>
                }
              />
            </div>
          )}

          {activeQuestion === 3 && (
            <div>
              <ProgressBar currentIndex={4} total={4} />
              <ProviderInput
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={false}
                title={"References"}
                subTitle={
                  "Seen other escorts? For some providers, this is all you need. Make sure to include their online profile (Eros, Adultsearch, etc.)"
                }
                input={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* <Input
                      onChange={(word) =>
                        this.setState({
                          employerCity: word.target.value,
                        })
                      }
                      value={employerCity}
                      placeholder="Facebook profile"
                      style={{ width: 260 }}
                    />
                    <div style={{ height: 10 }}></div>
                    <Input
                      onChange={(word) =>
                        this.setState({
                          employerCity: word.target.value,
                        })
                      }
                      value={employerCity}
                      placeholder="Twitter profile"
                      style={{ width: 260 }}
                    />
                    <div style={{ height: 10 }}></div>

                    <Input
                      onChange={(word) =>
                        this.setState({
                          employerCity: word.target.value,
                        })
                      }
                      value={employerCity}
                      placeholder="Address"
                      style={{ width: 260 }}
                    /> */}

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({
                          numReferences: [...numReferences, ""],
                        });
                      }}
                    >
                      {"Add a reference +"}
                    </div>
                    {numReferences.map((ref, index) => {
                      return (
                        <div style={{ marginTop: 10, marginBottom: 10 }}>
                          <ReferenceInput />
                        </div>
                      );
                    })}
                  </div>
                }
              />
            </div>
          )}

          <div style={{ height: 100 }}></div>
        </div>
      );
    } else {
      // Not signed in!
      return (
        <div>
          <Header />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {activeQuestion === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "60vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <img style={{ width: 200 }} src={providerData.picture} />

                  <div style={{ width: 50 }}></div>

                  <div style={{ width: "25vw" }}>
                    <div
                      style={{
                        fontSize: 24,
                        marginBottom: 30,
                      }}
                    >
                      {"Secure, safe, & private client screen for " +
                        providerData.first_name +
                        " " +
                        providerData.last_name}
                    </div>
                    <div style={{ fontSize: 12 }}>
                      {"We just need some info to make sure " +
                        providerData.first_name +
                        " is safe with you."}
                      <br /> <br />
                      {"The photo on the left has been hand verified by us as " +
                        providerData.first_name +
                        ", so you have nothing to worry about."}
                      <br /> <br />
                      This takes just a few minutes, it's (obviously) free, we
                      don't store any data you don't want us to.. <br /> <br />
                      <b>And we don't share your data with ANYONE. Period.</b>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: 20, marginTop: 60 }}>
                  Satisfied? Let's get started!
                </div>
                <div
                  onClick={() => this.startScreen()}
                  id="get-started-button"
                  style={{
                    padding: 10,
                    width: 100,
                    backgroundColor: "rgb(230, 30, 77)",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: 30,
                  }}
                >
                  START
                </div>
              </div>
            )}

            {activeQuestion === 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginBottom: 20,
                  }}
                >
                  What's your phone number?
                </div>
                <Input
                  value={activeInput1}
                  onChange={(word) =>
                    !isNaN(word.target.value)
                      ? this.setState({
                          activeInput1: word.target.value,
                        })
                      : null
                  }
                  type="text"
                  style={{ width: 250 }}
                  placeholder="Phone "
                />

                <div ref={(ref) => (this.recaptcha = ref)}></div>

                <div
                  id="get-started-button"
                  onClick={() => this.sendText()}
                  style={{
                    padding: 10,
                    width: 100,
                    backgroundColor: "rgb(230, 30, 77)",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: 30,
                  }}
                >
                  SEND
                </div>
              </div>
            )}

            {activeQuestion === 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginBottom: 20,
                  }}
                >
                  What's the code?
                </div>
                <Input
                  value={activeInput2}
                  onChange={(word) =>
                    this.setState({
                      activeInput2: word.target.value,
                    })
                  }
                  type="text"
                  style={{ width: 250 }}
                  placeholder="Code"
                />

                <div
                  id="get-started-button"
                  onClick={() => this.verifyText()}
                  style={{
                    padding: 10,
                    width: 100,
                    backgroundColor: "rgb(230, 30, 77)",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: 30,
                  }}
                >
                  SUBMIT
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  clickPrev() {}

  clickNext() {
    const { activeQuestion, activePosePictureUri, deleteItems } = this.state;
    if (activeQuestion === 0) {
      if (deleteItems[0]) {
        const conf = window.confirm(
          "This item will not be saved for next time. Are you sure?"
        );
        if (conf) {
          this.setState({
            activeQuestion: activeQuestion + 1,
          });
        }
      } else {
        this.setState({
          activeQuestion: activeQuestion + 1,
        });
      }
    } else if (activeQuestion === 1) {
    }
  }

  uploadedImage(state) {
    const ref = document.getElementById("pic-input").files;

    if (ref.length === 0) {
      this.setState({
        [state]: "",
      });
      return;
    }
    const image = ref[0];
    const blob = URL.createObjectURL(image);
    if (!image || !blob) {
      return;
    }

    this.setState({ [state]: blob });
  }

  // Update one of the selections.
  updateCheckedBoxes(box) {
    const deleteItems = this.state.deleteItems;
    deleteItems[box] = !deleteItems[box];
    this.setState({
      deleteItems: deleteItems,
    });
  }

  handleTakePhoto(dataUri) {
    this.setState({
      activePosePictureUri: dataUri,
    });
  }

  sendText() {
    const number = this.state.activeInput1;
    const appVerifier = window.recaptchaVerifier;
    const t = this;
    firebase
      .auth()
      .signInWithPhoneNumber(number, appVerifier)
      .then(function (confirmationResult) {
        console.log(confirmationResult);

        window.confirmationResult = confirmationResult;
        t.setState({
          activeQuestion: 2,
        });
      })
      .catch(function (error) {
        alert(error);
        // Error; SMS not sent
        // ...
      });
  }

  verifyText() {
    var code = this.state.activeInput2;
    window.confirmationResult
      .confirm(code)
      .then(function (result) {
        // Signed in! Set local storage, make a profile, and reload the page to begin.
        console.log(result);
        localStorage.setItem("client", "true");
        localStorage.setItem("provider", "false");
        firebase
          .firestore()
          .collection("Clients")
          .doc(firebase.auth().currentUser.uid)
          .set({
            address: "",
            age: "",
            assult_charges: "",
            background: "",
            employer: "",
            escora_ratings: [],
            escora_reviews: [],
            facebook: "",
            felonies: "",
            first_name: "Andrew",
            height: "",
            income: "",
            job_title: "",
            last_name: "",
            linkedin: "",
            phone: this.state.activeInput1,
            picture: "",
            race: "",
            references: [],
            twitter: "",
          })
          .then(() => {
            window.location.reload();
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch(function (error) {
        alert(error);
        // User couldn't sign in (bad verification code?)
        // ...
      });
  }

  startScreen() {
    const { activeQuestion } = this.state;

    this.setState({
      activeQuestion: activeQuestion + 1,
    });
  }

  async pullProviderData() {
    const id = window.location.pathname.substring(
      1,
      window.location.pathname.length
    );
    const provider = await firebase
      .firestore()
      .collection("Providers")
      .where("escora_id", "==", id)
      .get();

    if (provider.empty) {
      // Render error page
      this.setState({
        errorPage: true,
      });
    } else {
      this.setState({
        providerData: provider.docs[0].data(),
      });
    }
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

  componentDidUpdate() {
    if (
      this.state.activeQuestion === 1 &&
      !window.recaptchaVerifier &&
      // !firebase.auth().currentUser
      false
    ) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        this.recaptcha,
        {
          size: "normal",

          callback: function (response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          "expired-callback": function () {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
      window.recaptchaVerifier.render().then(function (widgetId) {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }
}
