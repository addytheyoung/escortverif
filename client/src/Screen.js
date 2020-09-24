import React, { Component } from "react";
import Header from "./Header";
import ProviderInput from "./ProviderInput";
import { Input, Checkbox, Select, MenuItem } from "@material-ui/core";
import Camera from "react-html5-camera-photo";
import CropImage from "./CropImage";
import * as firebase from "firebase";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import ProgressBar from "./ProgressBar";
import ReferenceInput from "./ReferenceInput";
import { isMobile } from "react-device-detect";
import "./css/ProviderSignUp.css";
import randomNumber from "./functions/randomNumber";
import { act } from "react-dom/test-utils";

export default class Screen extends Component {
  constructor(props) {
    super(props);

    const { profileData } = this.props;

    const {
      address,
      age,
      assult_charges,
      background,
      employer,
      employer_city,
      escora_ratings,
      escora_reviews,
      facebook,
      felonies,
      first_name,
      instagram,
      job_title,
      last_name,
      liscense_picture,
      linkedin,
      phone,
      picture,
      race,
      references,
      twitter,
    } = profileData;

    this.state = {
      uploadingPicture: false,
      uploadingFile: true,
      croppingPicture: false,
      info: "",
      firstName: first_name,
      facebook: facebook,
      instagram: instagram,
      references: references,
      twitter: twitter,
      lastName: last_name,
      ageRange: age ? age : "Age Range",
      race: race,
      deleteItems: [false, false, false, false, false, false],
      activeInput1: "+1",
      activeInput2: "",
      errorPage: false,
      providerData: false,
      activePosePictureUri: picture,
      activeLiscenseUri: liscense_picture,
      jobTitle: job_title,
      employerTitle: employer,
      employerCity: employer_city,
      linkedinProfile: linkedin,
      activePaystubUri: "",
      numReferences: [],
      activeQuestion: 0,
      activeQuestionArray: [],
      croppedImg: "",
      activeImage: "",
    };

    this.pullProviderData();
  }

  render() {
    // Get all the data
    const {
      uploadingPicture,
      uploadingFile,
      croppingPicture,
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
      firstName,
      lastName,
      ageRange,
      race,
      activeQuestionArray,
      facebook,
      instagram,
      twitter,
      references,
      croppedImg,
      activeImage,
    } = this.state;
    const { profileData } = this.props;

    // get the activequestionindex
    var activeQuestionArrayIndex = -1;
    for (var i = 0; i < activeQuestionArray.length; i++) {
      if (activeQuestionArray[i] === activeQuestion) {
        activeQuestionArrayIndex = i;
        break;
      }
    }

    if (errorPage) {
      return <ErrorPage />;
    } else if (!providerData) {
      return (
        <div>
          <LoadingPage />
        </div>
      );
    } else if (profileData.first_name) {
      // Signed in!
      return (
        <div>
          <Header />

          <div style={{ height: 81 }}></div>

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
              <ProgressBar
                currentIndex={activeQuestionArrayIndex + 1}
                total={activeQuestionArray.length}
              />
              <ProviderInput
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                prevDisabled={true}
                nextDisabled={
                  firstName === "" ||
                  lastName === "" ||
                  ageRange === "Age Range" ||
                  race === ""
                }
                title={"About"}
                subTitle={
                  "Remember, only escorts you choose to share your profile with can see any of your info, and you can choose to not save it at all by checking the box below."
                }
                input={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      value={firstName}
                      onChange={(word) =>
                        this.setState({
                          firstName: word.target.value,
                        })
                      }
                      placeholder="First name"
                      style={{ width: isMobile ? "80vw" : 250, fontSize: 18 }}
                    />
                    <div style={{ height: 10 }} />
                    <Input
                      value={lastName}
                      onChange={(word) =>
                        this.setState({
                          lastName: word.target.value,
                        })
                      }
                      placeholder="Last name"
                      style={{ width: isMobile ? "80vw" : 250, fontSize: 18 }}
                    />
                    <div style={{ height: 10 }} />
                    <Select
                      onChange={(val) =>
                        this.setState({
                          ageRange: val.target.value,
                        })
                      }
                      value={ageRange}
                      placeholder="Age Range"
                      style={{
                        width: isMobile ? "80vw" : 250,
                        color: ageRange == "Age Range" ? "#a1a1a1" : "#000000",
                        fontWeight: 400,
                        fontSize: 18,
                      }}
                    >
                      <MenuItem value={"Age Range"}>Age range</MenuItem>
                      <MenuItem value={"18-25"}>18-25</MenuItem>
                      <MenuItem value={"26-30"}>26-30</MenuItem>
                      <MenuItem value={"31-35"}>31-35</MenuItem>
                      <MenuItem value={"36-40"}>36-40</MenuItem>
                      <MenuItem value={"41-45"}>41-45</MenuItem>
                      <MenuItem value={"46-50"}>46-50</MenuItem>
                      <MenuItem value={"51-55"}>51-55</MenuItem>
                      <MenuItem value={"56-60"}>56-60</MenuItem>
                      <MenuItem value={"60+"}>60+</MenuItem>

                      <MenuItem />
                    </Select>
                    <div style={{ height: 10 }} />
                    <Input
                      value={race}
                      onChange={(word) =>
                        this.setState({
                          race: word.target.value,
                        })
                      }
                      placeholder="Race"
                      style={{ width: isMobile ? "80vw" : 250, fontSize: 18 }}
                    />
                    <div style={{ height: 10 }} />

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
              <ProgressBar
                currentIndex={activeQuestionArrayIndex + 1}
                total={activeQuestionArray.length}
              />
              <ProviderInput
                prevDisabled={activeQuestionArrayIndex === 0}
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={!this.checkReferenceArray()}
                title={"References"}
                subTitle={
                  "Seen other escorts? For some providers, this is all you need. Make sure to include their online profile (Eros, Adultsearch, etc.)"
                }
                input={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{ cursor: "pointer", fontSize: 18 }}
                      onClick={() => {
                        if (numReferences.length >= 5) {
                          return;
                        }
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
                          <ReferenceInput
                            updateState={(state) =>
                              this.updateReferences(state, index)
                            }
                            key={index}
                          />
                        </div>
                      );
                    })}
                    <div
                      style={{ cursor: "pointer", marginTop: 20, fontSize: 18 }}
                      onClick={() => {
                        const tempRef = numReferences;
                        if (tempRef.length === 0) {
                          return;
                        }
                        tempRef.splice(0, 1);
                        this.setState({
                          numReferences: tempRef,
                        });
                      }}
                    >
                      {"Remove a reference -"}
                    </div>
                  </div>
                }
              />
            </div>
          )}

          {activeQuestion === 2 && (
            <div>
              <ProgressBar
                currentIndex={activeQuestionArrayIndex + 1}
                total={activeQuestionArray.length}
              />
              <ProviderInput
                prevDisabled={activeQuestionArrayIndex === 0}
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={activePosePictureUri === "" || croppingPicture}
                title={"Please upload a picture of you"}
                subTitle={
                  "This is used for Lisa's (and other Escorts) verification of what you look like. Nobody can see this, except escorts you choose to share it with."
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
                          <div style={{ fontSize: 18 }}>
                            I want this deleted after Lisa views it.
                          </div>
                        </div>
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
                          <div style={{ fontSize: 18 }}>
                            I want this deleted after Lisa views it.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                }
              />
            </div>
          )}

          {activeQuestion === 3 && (
            <div>
              <ProgressBar
                currentIndex={activeQuestionArrayIndex + 1}
                total={activeQuestionArray.length}
              />
              <ProviderInput
                prevDisabled={activeQuestionArrayIndex === 0}
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={activeLiscenseUri === "" || croppingPicture}
                title={"Please upload a picture of your liscense"}
                subTitle={"This is so we can verify your info."}
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
                        {!activeLiscenseUri && (
                          <Camera
                            onCameraStop={() => console.log("")}
                            oncameraError={() => console.log("")}
                            onTakePhoto={(dataUri) =>
                              this.handleTakePhoto(dataUri, "activeLiscenseUri")
                            }
                          ></Camera>
                        )}
                        <CropImage
                          showCroppedImage={!croppingPicture}
                          showOriginalImage={croppingPicture}
                          setCroppedImg={(croppedImgUrl) =>
                            this.setCroppedImg(croppedImgUrl)
                          }
                          picture={activeLiscenseUri}
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
                                  activeLiscenseUri: "",
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
                          <div style={{ fontSize: 18 }}>
                            I want this deleted after Lisa views it.
                          </div>
                        </div>
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
                            this.uploadedImage("activeLiscenseUri")
                          }
                          type="file"
                        />
                        <CropImage
                          showCroppedImage={!croppingPicture}
                          showOriginalImage={croppingPicture}
                          setCroppedImg={(croppedImgUrl) =>
                            this.setCroppedImg(croppedImgUrl)
                          }
                          picture={activeLiscenseUri}
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
                                  activeLiscenseUri: "",
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
                          <div style={{ fontSize: 18 }}>
                            I want this deleted after Lisa views it.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                }
              />
            </div>
          )}

          {activeQuestion === 4 && (
            <div>
              <ProgressBar
                currentIndex={activeQuestionArrayIndex + 1}
                total={activeQuestionArray.length}
              />
              <ProviderInput
                prevDisabled={activeQuestionArrayIndex === 0}
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
                  <div style={{ textAlign: "left", fontSize: 14 }}>
                    <div style={{ fontSize: 14 }}>
                      Lisa wants to make sure your job is not a threat to her.
                    </div>
                    <br />
                    1. Linkedin is required if you have one. If not, we may
                    contact to verify your employment. <br /> <br />
                    2. We NEVER say who we are or what we do if we need to reach
                    out. Everything is 100% confidential.
                    <br /> <br />
                    3. We have to save this information so we don't ever need to
                    do this again!
                    <br /> <br />
                    4. Feel free to upload a recent pay stub or W-2 form if
                    that's easier.
                    <br /> <br />
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
                        placeholder="Job title"
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
                        placeholder="Employer name"
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
                        placeholder="Employer city, State"
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
                        placeholder="Linkedin profile"
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

          {activeQuestion === 5 && (
            <div>
              <ProgressBar
                currentIndex={activeQuestionArrayIndex + 1}
                total={activeQuestionArray.length}
              />
              <ProviderInput
                prevDisabled={activeQuestionArrayIndex === 0}
                clickPrev={() => this.clickPrev()}
                clickNext={() => this.clickNext()}
                nextDisabled={false}
                title={"Social"}
                subTitle={
                  <div style={{}}>Optional, but highly reccomended</div>
                }
                input={
                  <div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Input
                        onChange={(word) =>
                          this.setState({
                            facebook: word.target.value,
                          })
                        }
                        value={facebook}
                        placeholder="Facebook profile"
                        style={{ width: 260, fontSize: 18 }}
                      />
                      <div style={{ height: 20 }}></div>
                      <Input
                        onChange={(word) =>
                          this.setState({
                            twitter: word.target.value,
                          })
                        }
                        value={twitter}
                        placeholder="Twitter profile"
                        style={{ width: 260, fontSize: 18 }}
                      />
                      <div style={{ height: 20 }}></div>
                      <Input
                        onChange={(word) =>
                          this.setState({
                            instagram: word.target.value,
                          })
                        }
                        value={instagram}
                        placeholder="Instagram profile"
                        style={{ width: 260, fontSize: 18 }}
                      />
                      <div style={{ height: 20 }}></div>
                      <Input
                        onChange={(word) =>
                          this.setState({
                            linkedinProfile: word.target.value,
                          })
                        }
                        value={linkedinProfile}
                        placeholder="Linkedin profile"
                        style={{ width: 260, fontSize: 18 }}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          )}
          {activeQuestion === 6 && (
            <div
              style={{
                marginTop: 80,
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  width: isMobile ? "90vw" : "30vw",
                  textAlign: "center",
                  color: "#008489",
                }}
              >
                You're all set!
              </div>
              <div style={{ fontSize: 18, marginTop: 30 }}>
                {"We've submitted your info to " +
                  providerData.first_name +
                  ". She'll get back to you soon!"}
              </div>
              <div style={{ fontSize: 18, marginTop: 30 }}>
                You're free to close this page.
              </div>
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
              marginTop: 120,
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
                        fontSize: 28,
                        marginBottom: 30,
                        fontWeight: 500,
                      }}
                    >
                      {"Secure, safe, & private client screen for " +
                        providerData.first_name}
                    </div>
                    <div style={{ fontSize: 16 }}>
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

                <div
                  style={{
                    fontSize: 24,
                    marginTop: 60,
                    fontWeight: 600,
                    color: "#008489",
                  }}
                >
                  Satisfied? Let's get started!
                </div>
                <div
                  onClick={() => this.startScreen()}
                  id="get-started-button"
                  style={{
                    padding: 10,
                    width: 150,
                    height: 40,
                    fontSize: 18,
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
                    fontSize: 28,
                    marginBottom: 20,
                    fontWeight: 500,
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
                  style={{ width: 300, fontSize: 22 }}
                  placeholder="Phone"
                />

                <div ref={(ref) => (this.recaptcha = ref)}></div>

                <div
                  id="get-started-button"
                  onClick={() => this.sendText()}
                  style={{
                    padding: 10,
                    height: 30,
                    width: 150,
                    backgroundColor: "rgb(230, 30, 77)",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: 30,
                    fontSize: 18,
                  }}
                >
                  SEND CODE
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
                    fontSize: 26,
                    marginBottom: 20,
                    fontWeight: 500,
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
                  style={{ width: 300, fontSize: 22 }}
                  placeholder="Code"
                />

                <div
                  id="get-started-button"
                  onClick={() => this.verifyText()}
                  style={{
                    padding: 10,
                    height: 30,
                    width: 150,
                    backgroundColor: "rgb(230, 30, 77)",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: 30,
                    fontSize: 18,
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

  clickPrev() {
    const { activeQuestion, activeQuestionArray } = this.state;
    var activeQuestionArrayIndex = -1;
    for (var i = 0; i < activeQuestionArray.length; i++) {
      if (activeQuestionArray[i] === activeQuestion) {
        activeQuestionArrayIndex = i;
        break;
      }
    }

    this.setState({
      activeQuestion: activeQuestionArray[activeQuestionArrayIndex - 1],
    });
  }

  async clickNext() {
    const {
      activeQuestion,
      activePosePictureUri,
      deleteItems,
      activeQuestionArray,
    } = this.state;
    var activeQuestionArrayIndex = -1;
    for (var i = 0; i < activeQuestionArray.length; i++) {
      if (activeQuestionArray[i] === activeQuestion) {
        activeQuestionArrayIndex = i;
        break;
      }
    }

    if (activeQuestion === 0) {
      if (deleteItems[0]) {
        const conf = window.confirm(
          "This item will not be saved for next time. Are you sure?"
        );
        if (conf) {
          await this.updateDatabase();
          this.setState({
            activeQuestion: activeQuestionArray[activeQuestionArrayIndex + 1],
          });
        }
      } else {
        await this.updateDatabase();
        this.setState({
          activeQuestion: activeQuestionArray[activeQuestionArrayIndex + 1],
        });
      }
    } else {
      await this.updateDatabase();
      this.setState({
        activeQuestion: activeQuestionArray[activeQuestionArrayIndex + 1],
      });
    }
  }

  updateReferences(newState, index) {
    const { references } = this.state;
    const tempReferences = references;

    if (index < tempReferences.length) {
      tempReferences[index] = newState;
    } else {
      tempReferences.push(newState);
    }

    this.setState({
      references: tempReferences,
    });
  }

  checkReferenceArray() {
    const { references, numReferences } = this.state;
    if (references.length < numReferences.length) {
      return false;
    } else {
      for (var i = 0; i < numReferences.length; i++) {
        if (references[i].name === "" || references[i].contact === "") {
          return false;
        }
      }
    }

    return true;
  }

  // ** Check out Pages start **

  checkSocialPage(profileData, providerData) {
    const { facebook, twitter, instagram } = profileData;
    const { client_facebook, client_twitter, client_instagram } = providerData;

    if (
      (client_facebook && facebook === "") ||
      (client_twitter && twitter === "") ||
      (client_instagram && instagram === "")
    ) {
      return true;
    }

    return false;
  }

  checkEmploymentPage(profileData, providerData) {
    const { job_title, employer, employer_city, linkedin } = profileData;
    const {
      client_job,
      client_company,
      client_employer_city,
      client_linkedin,
    } = providerData;

    if (
      (client_job && job_title === "") ||
      (client_company && employer === "") ||
      (client_employer_city && employer_city === "") ||
      (client_linkedin && linkedin === "")
    ) {
      return true;
    }
    return false;
  }

  checkLiscensePage(profileData, providerData) {
    const { liscense_picture } = profileData;
    const client_liscense = true;

    if (client_liscense && liscense_picture === "") {
      return true;
    }
    return false;
  }

  checkPicturePage(profileData, providerData) {
    const { picture } = profileData;
    const { client_photo } = providerData;

    if (client_photo && picture === "") {
      return true;
    }
    return false;
  }

  checkReferencePage(profileData, providerData) {
    const { references } = profileData;
    const { client_references } = providerData;

    if (
      client_references &&
      (references.length === 0 ||
        references[0].name === "" ||
        references[0].contact === "")
    ) {
      return true;
    }
    return false;
  }

  checkAboutPage(profileData, providerData) {
    const { first_name, last_name, age, race } = profileData;
    const { client_name, client_age, client_race } = providerData;
    if (client_name && (first_name === "" || last_name === "")) {
      return true;
    } else if (client_age && age === "Age Range") {
      return true;
    } else if (client_race && race === "") {
      return true;
    }
    return false;
  }

  // ** Check out Pages end **

  // What questions does our user need to answer?
  pullActiveQuestions(providerData) {
    const profileData = this.props.profileData;
    var finalActiveQuestionArray = [];
    const signedIn = firebase.auth().currentUser;

    if (signedIn) {
      if (this.checkAboutPage(profileData, providerData)) {
        finalActiveQuestionArray.push(0);
      }

      if (this.checkReferencePage(profileData, providerData)) {
        finalActiveQuestionArray.push(1);
      }

      if (this.checkPicturePage(profileData, providerData)) {
        finalActiveQuestionArray.push(2);
      }

      if (this.checkLiscensePage(profileData, providerData)) {
        finalActiveQuestionArray.push(3);
      }

      if (this.checkEmploymentPage(profileData, providerData)) {
        finalActiveQuestionArray.push(4);
      }

      if (this.checkSocialPage(profileData, providerData)) {
        finalActiveQuestionArray.push(5);
      }
      // Always push the final page
      finalActiveQuestionArray.push(6);
    } else {
      finalActiveQuestionArray = [0, 1, 2, 3, 4, 5, 6];
    }

    return finalActiveQuestionArray;
  }

  async updateDatabase() {
    const {
      activeQuestion,
      firstName,
      lastName,
      ageRange,
      race,
      croppedImg,
      references,
      jobTitle,
      employerTitle,
      employerCity,
      activePaystubUri,
      activeImage,
      linkedinProfile,
      facebook,
      twitter,
      instagram,
    } = this.state;
    const myDocRef = firebase.firestore().collection("Clients").doc("abc");
    if (activeQuestion === 0) {
      // About
      await myDocRef.update({
        first_name: firstName,
        last_name: lastName,
        age: ageRange,
        race: race,
      });
    } else if (activeQuestion === 1) {
      // References
      await myDocRef.update({
        references: references,
      });
    } else if (activeQuestion === 2) {
      console.log(croppedImg);
      const number = randomNumber(20);
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
    } else if (activeQuestion === 3) {
      console.log(croppedImg);
      const storageRef = firebase
        .storage()
        .ref()
        .child(firebase.auth().currentUser.uid)
        .child("liscense");

      await storageRef.put(croppedImg);
      const url = await storageRef.getDownloadURL();
      await myDocRef.update({
        lisense_picture: url,
      });
    } else if (activeQuestion === 4) {
      var url = "";
      if (activePaystubUri) {
        const storageRef = await firebase
          .storage()
          .ref()
          .child(firebase.auth().currentUser.uid)
          .child("employment");

        await storageRef.put(activeImage);
        url = await storageRef.getDownloadURL();
      }
      await myDocRef.update({
        paystub_picture: url,
        job_title: jobTitle,
        employer: employerTitle,
        employer_city: employerCity,
        linkedin: linkedinProfile,
      });
    } else if (activeQuestion === 5) {
      await myDocRef.update({
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        linkedin: linkedinProfile,
      });
    } else {
      alert("State error. Please refresh.");
      window.location.reload();
    }
  }

  setCroppedImg(croppedImgUrl) {
    this.setState({
      croppedImg: croppedImgUrl,
    });
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

  // Update one of the selections.
  updateCheckedBoxes(box) {
    const deleteItems = this.state.deleteItems;
    deleteItems[box] = !deleteItems[box];
    this.setState({
      deleteItems: deleteItems,
    });
  }

  handleTakePhoto(dataUri, type) {
    this.setState({
      [type]: dataUri,
      croppingPicture: true,
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
      })``.catch(function (error) {
      alert(error.message);
      // Error; SMS not sent
      // ...
    });
  }

  verifyText() {
    const { activeInput1, activeInput2 } = this.state;
    var code = activeInput2;
    window.confirmationResult
      .confirm(code)
      .then(function (result) {
        // Signed in! Set local storage, make a profile, and reload the page to begin.
        localStorage.setItem("client", "true");
        localStorage.setItem("provider", "false");
        if (result.additionalUserInfo.isNewUser) {
          firebase
            .firestore()
            .collection("Clients")
            .doc(result.user.uid)
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
              phone: activeInput1,
              picture: "",
              race: "",
              references: [],
              twitter: "",
            })
            .then(() => {
              window.location.reload();
            })
            .catch((e) => {
              alert(e.message);
              console.log(e.message);
            });
        } else {
          window.location.reload();
        }
      })
      .catch(function (error) {
        alert("Wrong code!");
        console.log(error.message);
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

  // Pull the data from the provider
  async pullProviderData() {
    const path = window.location.pathname;
    if (path === "/getstartedclient") {
      // Get the static, default profile
      const provider = await firebase
        .firestore()
        .collection("Providers")
        .where("escora_id", "==", "lisali69")
        .get();

      const activeQuestionArray = this.pullActiveQuestions(
        provider.docs[0].data()
      );

      this.setState({
        providerData: provider.docs[0].data(),
        activeQuestionArray: activeQuestionArray,
        activeQuestion: activeQuestionArray[0],
      });
    } else {
      // Get the specific provider data.
      const id = path.substring(1, path.length);
      const provider = await firebase
        .firestore()
        .collection("Providers")
        .where("escora_id", "==", id)
        .get();

      if (provider.empty) {
        this.setState({
          errorPage: true,
        });
      } else {
        const activeQuestionArray = this.pullActiveQuestions(
          provider.docs[0].data()
        );

        this.setState({
          providerData: provider.docs[0].data(),
          activeQuestionArray: activeQuestionArray,
          activeQuestion: activeQuestionArray[0],
        });
      }
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
      // this.state.activeQuestion === 1 &&
      // !window.recaptchaVerifier &&
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