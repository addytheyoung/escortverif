import React, { Component } from "react";
import Header from "./Header";
import * as firebase from "firebase";
import LoadingPage from "./LoadingPage";
import { Checkbox } from "@material-ui/core";
import Button from "./Button";

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
                <div>{"No felonies?"}</div>
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
                <div>{"No assult charges?"}</div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(1)}
                  checked={checkedBoxes[1]}
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
                      onChange={() => this.updateCheckedBoxes(1)}
                      checked={checkedBoxes[1]}
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
                <div>{client.employer}</div>
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
                <div>{client.employer_city}</div>
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
                <div
                  onClick={() => window.open(client.linkedin)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {client.linkedin}
                </div>
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
                <div
                  onClick={() => window.open(client.facebook)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {client.facebook}
                </div>
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
                <div
                  onClick={() => window.open(client.twitter)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {client.twitter}
                </div>
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
                <div
                  onClick={() => window.open(client.instagram)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {client.instagram}
                </div>
                <Checkbox
                  onChange={() => this.updateCheckedBoxes(1)}
                  checked={checkedBoxes[1]}
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
    const now = new Date();
    const time = now.getTime();

    const docRef = firebase
      .firestore()
      .collection("Clients")
      .doc(client.doc_id);

    await docRef.update({
      verify_age: "green",
      verify_assult_charges: 0,
      verify_employer: "green",
      verify_employer_city: "green",
      verify_facebook: "gray",
      verify_felonies: "green",
      verify_first_name: "green",
      verify_instagram: "gray",
      verify_job_title: "green",
      verify_last_name: "green",
      verify_linkedin: "green",
      verify_phone: "green",
      verify_picture: "green",
      verify_race: "green",
      verify_references: "green",
      verify_twitter: "green",
      verify: false,
      verify_time: time,
    });
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
