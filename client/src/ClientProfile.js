import React, { Component } from "react";
import Header from "./Header";
import * as firebase from "firebase";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import randomNumber from "./functions/randomNumber";

export default class ClientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      clientData: {},
      errorPage: false,
    };

    this.pullClientData();
  }

  render() {
    console.log(randomNumber(10));
    const { loaded, clientData, errorPage } = this.state;
    console.log(clientData);
    if (errorPage) {
      return <ErrorPage client={true} />;
    } else if (!loaded) {
      return (
        <div>
          <LoadingPage />
        </div>
      );
    }
    return (
      <div>
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
            {"Green: We verified this and it's true."}
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
                    borderColor: "gray",
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pull the data from the provider
  async pullClientData() {
    const path = window.location.pathname;
    if (path === "/getstartedclient") {
      // Get the static, default profile
      const client = await firebase
        .firestore()
        .collection("Clients")
        .where("escora_id", "==", "abc")
        .get();

      this.setState({
        clientData: client.docs[0].data(),
        loaded: true,
      });
    } else {
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
          loaded: true,
        });
      }
    }
  }
}
