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

export default class RenderRoutes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedData: false,
      profileData: null,
      type: "",
    };

    this.pullProfileData();
  }

  render() {
    // const signedIn = !!firebase.auth().currentUser;
    const signedIn = true;
    const uid = "lisali48";
    const { loadedData, profileData } = this.state;
    if (!loadedData) {
      return <LoadingPage />;
    }
    return (
      <div>
        <Router>
          <Switch>
            {signedIn && (
              <Route
                path={"/" + uid}
                exact={true}
                render={() => <ProviderHome />}
              />
            )}
            {signedIn && (
              <Route
                path={"/makescreen"}
                exact={true}
                render={() => <MakeScreen />}
              />
            )}
            {!signedIn && (
              <Route path="/" exact={true} render={() => <Home />} />
            )}
            {!signedIn && (
              <Route path={"/" + uid} exact={true} render={() => <Screen />} />
            )}

            <Route
              path="/getstarted"
              exact={true}
              render={() => <ProviderSignUp />}
            />

            <Route path="/" exact={false} render={() => <ErrorPage />} />
          </Switch>
        </Router>
      </div>
    );
  }

  pullProfileData() {
    const provider = localStorage.getItem("provider");
    const client = localStorage.getItem("client");
    var colRef = "Provider";
    if (client) {
      colRef = client;
    }
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
  }
}
