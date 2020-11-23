import React, { Component } from "react";
import * as firebase from "firebase";
import LoadingPage from "./LoadingPage";

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
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(function (result) {
          localStorage.setItem("client", "false");
          localStorage.setItem("provider", "true");
          if (result.additionalUserInfo.isNewUser) {
            firebase
              .firestore()
              .collection("Providers")
              .doc(result.user.uid)
              .set({
                client_address: false,
                client_age: false,
                client_assult_charges: false,
                client_background: false,
                client_company: false,
                client_escora_ratings: true,
                client_escora_references: true,
                client_facebook: false,
                client_felonies: false,
                client_income: false,
                client_instagram: false,
                client_job: false,
                client_linkedin: false,
                client_name: true,
                client_phone: true,
                client_race: false,
                client_references: false,
                client_references_skip: false,
                client_stds: [false, false, false, false],
                client_twitter: false,
                client_verify_about: false,
                client_verify_employment: false,
                client_verify_photo: false,
                doc_id: result.user.uid,
                email: email,
                escora_id: "",
                first_name: "",
                last_name: "",
                picture: "",
                type: "provider",
              })
              .then(() => {
                window.location.href = "/getstarted";
              })
              .catch((e) => {
                alert(e.message);
                console.log(e.message);
              });
          } else {
            window.location.href = "/getstarted";
          }
        })
        .catch(function (error) {
          alert(error.message);
          console.log(error.message);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
    return <LoadingPage />;
  }
}
