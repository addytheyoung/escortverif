import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import ProviderSignUp from "./ProviderSignUp";
import ProviderHome from "./ProviderHome";
import * as firebase from "firebase";
import MakeScreen from "./MakeScreen";
import Screen from "./Screen";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Profile from "./Profile";
import SignInPage from "./SignInPage";
import About from "./About";
import VerifyEmail from "./VerifyEmail";
import ClientProfile from "./ClientProfile";
import AndrewVerify from "./AndrewVerify";
import GetAllDataFromFirestore from "./scripts/GetAllDataFromFirestore";
import WriteTestIntoRealData from "./scripts/WriteTestIntoRealData";
import ClientHome from "./ClientHome";

export default class RenderRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedData: false,
      profileData: null,
      type: "",
    };
  }

  render() {
    const signedIn = !!firebase.auth().currentUser;
    var uid = "";
    if (signedIn) {
      uid = firebase.auth().currentUser.uid;
    }
    const { loadedData, profileData, type } = this.state;
    if (!loadedData) {
      return <LoadingPage />;
    }
    const client = profileData.type === "client";
    const provider = profileData.type === "provider";
    return (
      <div>
        <Router>
          {signedIn && (
            <Switch>
              <Route path="/about" exact={true} render={() => <About />} />
              <Route path="/profile" exact={true} render={() => <Profile />} />
              <Route
                path={"/makescreen"}
                exact={true}
                render={() => <MakeScreen profileData={profileData} />}
              />
              <Route
                path="/getstarted"
                exact={true}
                render={() => <ProviderSignUp profileData={profileData} />}
              />

              <Route
                path={"/andrewverify"}
                exact={true}
                render={() => <AndrewVerify profileData={profileData} />}
              />

              <Route
                path="/clientprofile"
                exact={false}
                render={() => <ClientProfile profileData={profileData} />}
              />

              <Route
                path="/verifyemail"
                exact={true}
                render={() => <LoadingPage />}
              />

              {provider && (
                <Switch>
                  <Route
                    path="/"
                    exact={false}
                    render={() => <ProviderHome profileData={profileData} />}
                  />
                </Switch>
              )}

              {client && (
                <Switch>
                  <Route path="/" exact={true} render={() => <ClientHome />} />
                  <Route
                    path={"/"}
                    exact={false}
                    render={() => <Screen profileData={profileData} />}
                  />
                </Switch>
              )}
            </Switch>
          )}

          {!signedIn && (
            <Switch>
              <Route path="/" exact={true} render={() => <Home />} />
              <Route
                path={"/makescreen"}
                exact={true}
                render={() => <MakeScreen profileData={profileData} />}
              />

              <Route
                path={"/andrewscripts"}
                exact={true}
                render={() => <WriteTestIntoRealData />}
              />
              <Route path="/about" exact={true} render={() => <About />} />
              <Route
                path="/profile"
                exact={true}
                render={() => <SignInPage />}
              />

              <Route
                path="/getstarted"
                exact={true}
                render={() => <ProviderSignUp profileData={profileData} />}
              />

              <Route
                path="/getstartedclient"
                exact={true}
                render={() => <Screen profileData={profileData} />}
              />

              <Route
                path="/verifyemail"
                exact={true}
                render={() => <VerifyEmail />}
              />

              <Route
                path={"/andrewverify"}
                exact={true}
                render={() => <AndrewVerify profileData={profileData} />}
              />

              <Route
                path={"/"}
                exact={false}
                render={() => <Screen profileData={profileData} />}
              />
            </Switch>
          )}
        </Router>
      </div>
    );
  }

  async componentDidMount() {
    const signedIn = !!firebase.auth().currentUser;

    // We're signed in!
    if (signedIn) {
      // Provider or client?
      const provider = localStorage.getItem("provider");
      const client = localStorage.getItem("client");
      var colRef = "Providers";
      if (client === "true") {
        colRef = "Clients";
      }

      firebase
        .firestore()
        .collection(colRef)
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          this.setState({
            profileData: snapshot.data(),
            loadedData: true,
            type: colRef,
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      // In test mode?
      const test = true;
      if (test) {
        const snapshot = await firebase
          .firestore()
          .collection("Providers")
          .doc("zjolOpyhN1adZBircfQXLo1wLHz1")
          .get();
        this.setState({
          profileData: snapshot.data(),
          loadedData: true,
          type: "",
        });
      } else {
        this.setState({
          profileData: {},
          loadedData: true,
          type: "",
        });
      }
    }
  }
}
