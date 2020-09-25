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
    return (
      <div>
        <Router>
          {signedIn && (
            <Switch>
              <Route path="/" exact={true} render={() => <Home />} />
              <Route path="/about" exact={true} render={() => <About />} />
              <Route path="/profile" exact={true} render={() => <Profile />} />
              <Route
                path={"/makescreen"}
                exact={true}
                render={() => <MakeScreen />}
              />
              <Route
                path="/getstarted"
                exact={true}
                render={() => <ProviderSignUp profileData={profileData} />}
              />
              <Route
                path={"/"}
                exact={false}
                render={() => <Screen profileData={profileData} />}
              />
              {/* <Route path="/" exact={false} render={() => <ErrorPage />} /> */}
            </Switch>
          )}

          {!signedIn && (
            <Switch>
              <Route
                path={"/makescreen"}
                exact={true}
                render={() => <MakeScreen />}
              />
              <Route path="/" exact={true} render={() => <Home />} />
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
                path="/clientprofile"
                exact={false}
                render={() => <ClientProfile profileData={profileData} />}
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
    if (!signedIn) {
      // Get the path
      const path = window.location.pathname;
      // Provider or client?
      const provider = localStorage.getItem("provider");
      const client = localStorage.getItem("client");
      var colRef = "Providers";
      // if (client == "true") {
      //   colRef = "Clients";
      // }

      firebase
        .firestore()
        .collection(colRef)
        .doc("abc")
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
      this.setState({
        profileData: {},
        loadedData: true,
        type: "",
      });
    }
  }
}
