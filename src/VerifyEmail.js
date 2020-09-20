import React, { Component } from "react";
import * as firebase from "firebase";

export default class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("email");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      alert(email);
      // The client SDK will parse the code from the link for you.
      //   firebase
      //     .auth()
      //     .signInWithEmailLink(email, window.location.href)
      //     .then(function (result) {
      //       // Clear email from storage.
      //       window.localStorage.removeItem("emailForSignIn");
      //       // You can access the new user via result.user
      //       // Additional user info profile not available via:
      //       // result.additionalUserInfo.profile == null
      //       // You can check if the user is new or existing:
      //       // result.additionalUserInfo.isNewUser
      //     })
      //     .catch(function (error) {
      //       // Some error occurred, you can inspect the code: error.code
      //       // Common errors could be invalid email and invalid or expired OTPs.
      //     });
    }
    return <div></div>;
  }
}
