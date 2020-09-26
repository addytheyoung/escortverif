import React, { Component } from "react";
import Header from "./Header";
import * as firebase from "firebase";
import LoadingPage from "./LoadingPage";
import { Checkbox } from "@material-ui/core";
import Button from "./Button";
import api from "./api";

export default class AndrewVerify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedClients: false,
      clientsData: [],
      checkedBoxes: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
      currentClientIndex: 0,
    };

    this.pullClientsToVerify();
  }

  render() {
    const {
      loadedClients,
      clientsData,
      checkedBoxes,
      currentClientIndex,
    } = this.state;
    if (!loadedClients) {
      return <LoadingPage />;
    }
    const client = clientsData[currentClientIndex];
    return (
      <div>
        <Header margin={"10vw"} />
        <div
          style={{
            marginLeft: "10vw",
            marginRight: "10vw",
            marginTop: 140,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "40vw" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{client.first_name + " " + client.last_name}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(0)}
                  checked={checkedBoxes[0]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{client.age}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(1)}
                  checked={checkedBoxes[1]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{client.race}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(2)}
                  checked={checkedBoxes[2]}
                />
              </div>
              <img
                src={client.license_picture}
                style={{ width: "30vw", marginTop: 20 }}
              />
            </div>

            <div style={{ width: "40vw" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src={client.picture}
                  style={{ width: "30vw", marginTop: 20 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{"Picture good?"}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(3)}
                  checked={checkedBoxes[3]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{"No felonies?"}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(4)}
                  checked={checkedBoxes[4]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{"No assult charges?"}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(5)}
                  checked={checkedBoxes[5]}
                />
              </div>

              {client.references.map((reference, refIndex) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>{reference.name}</div>
                      <div>{reference.contact}</div>
                    </div>

                    <Checkbox
                      onChange={() => this.updateCheckedBoxes(6)}
                      checked={checkedBoxes[6]}
                    />
                  </div>
                );
              })}
            </div>

            <div style={{ width: "40vw" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src={client.paystub_picture}
                  style={{ width: "30vw", marginTop: 20 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{client.job_title}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(7)}
                  checked={checkedBoxes[7]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{client.employer}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(8)}
                  checked={checkedBoxes[8]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>{client.employer_city}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(9)}
                  checked={checkedBoxes[9]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => window.open(client.linkedin)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {client.linkedin}
                </div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(10)}
                  checked={checkedBoxes[10]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => window.open(client.facebook)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {client.facebook}
                </div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(11)}
                  checked={checkedBoxes[11]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => window.open(client.twitter)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {client.twitter}
                </div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(12)}
                  checked={checkedBoxes[12]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => window.open(client.instagram)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {client.instagram}
                </div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(13)}
                  checked={checkedBoxes[13]}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              click={() => this.submitVerify(client)}
              text={"SUBMIT"}
              color={"green"}
            />
          </div>
        </div>
        <div style={{ height: 120 }}></div>
      </div>
    );
  }

  async submitVerify(client) {
    const { checkedBoxes } = this.state;
    const now = new Date();
    const time = now.getTime();

    const provider = (
      await firebase
        .firestore()
        .collection("Providers")
        .doc(client.applying_to_provider)
        .get()
    ).data();

    api.sendEmail(
      provider.email,
      "Escora Screen Complete",
      "Hey " +
        provider.first_name +
        ", you have a completed screening!\n\n See it here: https://www.escora.io/" +
        client.escora_id
    );

    const docRef = firebase
      .firestore()
      .collection("Clients")
      .doc(client.doc_id);

    await docRef.update({
      verify_age: checkedBoxes[1] ? "green" : "gray",
      verify_assult_charges: checkedBoxes[5] ? "green" : "red",
      verify_employer: checkedBoxes[8] ? "green" : "gray",
      verify_employer_city: checkedBoxes[9] ? "green" : "gray",
      verify_facebook: checkedBoxes[11] ? "green" : "gray",
      verify_felonies: checkedBoxes[4] ? "green" : "red",
      verify_instagram: checkedBoxes[13] ? "green" : "gray",
      verify_job_title: checkedBoxes[7] ? "green" : "gray",
      verify_linkedin: checkedBoxes[10] ? "green" : "gray",
      verify_name: checkedBoxes[0] ? "green" : "gray",
      verify_phone: "green",
      verify_picture: checkedBoxes[3] ? "green" : "gray",
      verify_race: checkedBoxes[2] ? "green" : "gray",
      verify_references: "gray",
      verify_stds: [false, false, false, false],
      verify_twitter: checkedBoxes[12] ? "green" : "gray",
      verify: false,
      verify_time: time,
      verified_providers: this.getVerifiedProviders(client, provider),
    });
  }

  getVerifiedProviders(client, provider) {
    const verifiedProviders = client.verified_providers;
    if (verifiedProviders) {
      verifiedProviders.push(provider.doc_id);
    } else {
      verifiedProviders = [provider.doc_id];
    }
    return verifiedProviders;
  }

  updateCheckedBoxes(index) {
    const { checkedBoxes } = this.state;
    checkedBoxes[index] = !checkedBoxes[index];
    this.setState({
      checkedBoxes: checkedBoxes,
    });
  }

  async pullClientsToVerify() {
    const docRef = firebase
      .firestore()
      .collection("Clients")
      .where("verify", "==", true);

    const snapshots = await docRef.get();
    if (!snapshots || snapshots.empty) {
      this.setState({
        loadedClients: true,
        clientsData: [],
      });
    } else {
      const clientsData = [];
      for (var i = 0; i < snapshots.docs.length; i++) {
        const data = snapshots.docs[i].data();
        clientsData.push(data);
      }
      this.setState({
        loadedClients: true,
        clientsData: clientsData,
      });
    }
  }
}
