import React, { Component } from "react";
import Header from "./Header";
import * as firebase from "firebase";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import StarRatings from "react-star-ratings";
import Modal from "./Modal";

export default class ClientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientLoaded: false,
      reviewLoaded: false,
      clientData: {},
      errorPage: false,
      clientRatings: [],
      rateClient: false,
      currentRating: 3,
      providerReviewed: false,
    };

    this.pullClientData();
    this.pullReviewData();
  }

  render() {
    const {
      clientLoaded,
      clientRatings,
      clientData,
      errorPage,
      rateClient,
      currentRating,
      providerReviewed,
    } = this.state;
    if (errorPage) {
      return <ErrorPage client={true} />;
    } else if (!clientLoaded || !clientRatings) {
      return (
        <div>
          <LoadingPage />
        </div>
      );
    }
    return (
      <div>
        {rateClient && (
          <Modal
            modalContent={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 500, marginTop: 50 }}>
                  {"How was " + clientData.first_name + "?"}
                </div>
                <div style={{ marginTop: 20, fontSize: 16 }}>
                  {currentRating === 1 &&
                    "Horrible. Time waster, rude, smelled terrible, or very disrespectful."}
                  {currentRating === 2 &&
                    "Pretty bad, but wasn't the absolute worst."}
                  {currentRating === 3 &&
                    "Around average, not perfect but not terrible."}
                  {currentRating === 4 &&
                    "Above average client. Still a few flaws, but would reccomend."}
                  {currentRating === 5 && "Excellent client."}
                </div>
                <div style={{ marginTop: 80 }}>
                  <StarRatings
                    rating={this.state.currentRating}
                    starRatedColor="blue"
                    changeRating={(a) => {
                      this.setState({
                        currentRating: a,
                      });
                    }}
                    numberOfStars={5}
                    starRatedColor={"rgb(230, 30, 77)"}
                    starHoverColor={"black"}
                    name="rating"
                  />
                </div>
                <div
                  onClick={() => this.submitRating()}
                  style={{
                    backgroundColor: "#008489",
                    width: 180,
                    padding: 10,
                    color: "white",
                    fontWeight: "600",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30,
                    fontSize: 20,
                    height: 40,
                    cursor: "pointer",
                  }}
                >
                  SUBMIT
                </div>
              </div>
            }
            closeModal={() =>
              this.setState({
                rateClient: false,
              })
            }
          />
        )}
        <Header margin={"10vw"} />
        <div
          style={{
            marginTop: 120,
            marginLeft: "10vw",
            marginRight: "10vw",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 500 }}>
            {"Client profile for " +
              clientData.first_name +
              " " +
              clientData.last_name}
          </div>

          <div
            style={{
              color: "#008489",
              fontWeight: 600,
              fontSize: 20,
              marginTop: 30,
            }}
          >
            {"Green: We verified this recently, and it's true."}
          </div>

          <div
            style={{
              color: "gray",
              fontWeight: 600,
              fontSize: 20,
              marginTop: 5,
            }}
          >
            {"Gray: We didn't verify this, may or may not be true."}
          </div>
          <div style={{ marginLeft: 5 }}></div>

          <div
            style={{
              color: "red",
              fontWeight: 600,
              fontSize: 20,
              marginTop: 5,
            }}
          >
            {"Red: We found this to be false."}
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "40vw", marginTop: 100 }}>
              <div
                style={{
                  width: 250,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={clientData.picture}
                  style={{
                    width: 250,
                    height: 250,
                    borderRadius: 1000,
                    borderWidth: 10,
                    borderColor: "#008489",
                    borderStyle: "solid",
                  }}
                ></img>
                <div>
                  <div
                    style={{
                      fontSize: 22,
                      marginTop: 20,
                      fontWeight: 600,
                      color: "#008489",
                    }}
                  >
                    {clientData.first_name + " " + clientData.last_name}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: "#008489",
                    }}
                  >
                    {clientData.age}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      color: "#008489",
                      fontWeight: 600,
                    }}
                  >
                    {clientData.race}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: "40vw", marginTop: 100 }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  color: "#008489",
                }}
              >
                {"Phone number: " + clientData.phone}
              </div>
              <div
                style={{
                  fontSize: 22,
                  marginTop: 20,
                  fontWeight: "600",
                  color: "#008489",
                }}
              >
                {clientData.job_title + " at " + clientData.employer}
              </div>
              <div
                style={{
                  fontSize: 22,
                  marginTop: 20,
                  fontWeight: "600",
                  color: "#008489",
                }}
              >
                {"No felonies"}
              </div>

              <div
                style={{
                  fontSize: 22,
                  marginTop: 20,
                  fontWeight: "600",
                  color: "#008489",
                }}
              >
                {"No assult charges"}
              </div>
              <div
                onClick={() => window.open(clientData.linkedin)}
                style={{
                  fontSize: 22,
                  marginTop: 20,
                  fontWeight: "600",
                  color: "#008489",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {"LinkedIn: " + clientData.linkedin}
              </div>

              {clientData.facebook !== "" && (
                <div
                  onClick={() => window.open(clientData.facebook)}
                  style={{
                    fontSize: 22,
                    marginTop: 20,
                    fontWeight: "600",
                    color: "gray",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {"Facebook: " + clientData.facebook}
                </div>
              )}
              {clientData.twitter !== "" && (
                <div
                  onClick={() => window.open(clientData.twitter)}
                  style={{
                    fontSize: 22,
                    marginTop: 20,
                    fontWeight: "600",
                    color: "gray",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {"Twitter: " + clientData.twitter}
                </div>
              )}
              {clientData.instagram !== "" && (
                <div
                  onClick={() => window.open(clientData.instagram)}
                  style={{
                    fontSize: 22,
                    marginTop: 20,
                    fontWeight: "600",
                    color: "red",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {"Instagram: " + clientData.instagram}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ marginTop: 120, width: "40vw" }}>
              <div style={{ fontSize: 32, fontWeight: 500 }}>
                Escora Ratings
              </div>

              {clientRatings.length === 0 && (
                <div style={{ fontSize: 20, marginTop: 10 }}>
                  No ratings for this client
                </div>
              )}
              {clientRatings.length !== 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 10,
                    fontSize: 18,
                  }}
                >
                  <img
                    src={require("./images/star.svg")}
                    style={{ height: 12, width: 12, marginRight: 5 }}
                  />
                  {this.getTotalRating(clientRatings) +
                    " (" +
                    clientRatings.length +
                    ")"}
                </div>
              )}
              {!providerReviewed && (
                <div
                  onClick={() =>
                    this.setState({
                      rateClient: true,
                    })
                  }
                  style={{
                    backgroundColor: "#008489",
                    width: 180,
                    padding: 10,
                    color: "white",
                    fontWeight: "600",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30,
                    fontSize: 20,
                    height: 40,
                    cursor: "pointer",
                  }}
                >
                  Rate this client!
                </div>
              )}
              {providerReviewed && (
                <div style={{ marginTop: 20, fontSize: 18 }}>
                  You've already rated this client!
                </div>
              )}
            </div>
            <div style={{ marginTop: 120 }}>
              <div style={{ fontSize: 32, fontWeight: 500 }}>
                Escora Reviews
              </div>

              <div style={{ fontSize: 20, marginTop: 10 }}>
                Coming soon. Remember, only clients get ratings and reviews, not
                you.
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 120 }}></div>
      </div>
    );
  }

  async submitRating() {
    const { profileData } = this.props;
    const path = window.location.pathname;
    // Get the specific provider data.
    const id = path.substring(15, path.length);

    const fireRef = firebase.firestore().collection("Reviews");
    await fireRef.doc().set({
      client_escora_id: id,
      provider_escora_id: profileData.escora_id,
      rating: this.state.currentRating,
      review: "",
    });

    window.location.reload();
  }

  // Pull the data from the provider
  async pullClientData() {
    const path = window.location.pathname;
    // Get the specific provider data.
    const id = path.substring(15, path.length);
    const client = await firebase
      .firestore()
      .collection("Clients")
      .where("escora_id", "==", id)
      .get();

    if (client.empty) {
      this.setState({
        errorPage: true,
      });
    } else {
      this.setState({
        clientData: client.docs[0].data(),
        clientLoaded: true,
      });
    }
  }

  async pullReviewData() {
    const path = window.location.pathname;

    // Get the specific provider data.
    const id = path.substring(15, path.length);
    const clientRatings = await firebase
      .firestore()
      .collection("Reviews")
      .where("client_escora_id", "==", id)
      .get();

    if (clientRatings.empty) {
      this.setState({
        clientRatings: [],
        reviewLoaded: true,
        providerReviewed: false,
      });
    } else {
      this.setState({
        clientRatings: clientRatings.docs,
        reviewLoaded: true,
        providerReviewed: this.hasProviderReviewed(clientRatings.docs),
      });
    }
  }

  getTotalRating(clientRatings) {
    var total = 0;
    for (var i = 0; i < clientRatings.length; i++) {
      total += clientRatings[i].data().rating;
    }
    total /= clientRatings.length;

    return ((total / 100) * 100).toFixed(2);
  }

  hasProviderReviewed(clientRatings) {
    for (var i = 0; i < clientRatings.length; i++) {
      if (
        clientRatings[i].data().provider_escora_id ===
        this.props.profileData.escora_id
      ) {
        return true;
      }
    }
    return false;
  }
}
