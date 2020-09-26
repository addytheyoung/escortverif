import React, { Component } from "react";
import * as firebase from "firebase";
import Header from "../Header";

export default class GetAllDataFromFirestore extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getAllData();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }

  async getAllData() {
    const client = (
      await firebase.firestore().collection("Clients").doc("abc").get()
    ).data();
    const provider = (
      await firebase.firestore().collection("Providers").doc("abc").get()
    ).data();

    firebase
      .firestore()
      .collection("ClientsTest")
      .doc(client.doc_id)
      .set(client);

    firebase
      .firestore()
      .collection("ProvidersTest")
      .doc(provider.doc_id)
      .set(provider);
  }
}
