import React, { Component } from "react";
import Header from "./Header";

export default class About extends Component {
  render() {
    return (
      <div>
        <Header margin={"10vw"} />
        <div
          style={{
            marginLeft: "10vw",
            marginRight: "10vw",
            display: "flex",
            flexDirection: "column",
            marginTop: 120,
          }}
        >
          <div
            style={{ fontSize: 28, fontWeight: 600, color: "rgb(230, 30, 77)" }}
          >
            Escorts
          </div>
          <div style={{ marginTop: 10, fontSize: 16, color: "gray" }}>
            Share your link with clients, get results in minutes.
          </div>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/sketch.svg")}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Design Your Screen
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                Customize the info you want from your clients! We verify
                everything you need, and send you the clients profile.
              </div>
            </div>
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/link copy.svg")}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Share Link
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                Just send your Escora link to a client to screen them! We handle
                the rest of the work.
              </div>
            </div>

            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/thunder.svg")}
              />

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Get Results
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                You get results in about 15 minutes. See all the verified info
                from the client, as well as ratings/reviews from other Escorts
                who saw this client.
              </div>
            </div>
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/star (1).svg")}
              />

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Client Ratings & Reviews
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                Leave your own anonymous rating/review for the client! Don't
                worry, on Escora, clients can't rate or review escorts, but you
                can!
              </div>
            </div>
          </div>
          <div style={{ height: 100 }}></div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#008489" }}>
            Clients
          </div>

          <div style={{ marginTop: 10, fontSize: 16, color: "gray" }}>
            Get a link from your Escort, give us some info, then have a good
            time!
          </div>

          <div
            style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
              width: "60vw",
              marginLeft: "10vw",
            }}
          >
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/link.svg")}
              />

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Recieve a Link
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                An Escort will send you a link you follow, or you can sign up
                ahead of time right here! Her profile on our platform proves
                she's real and safe.
              </div>
            </div>
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/google-forms.svg")}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Fill Out New Info
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                Fill out the info the Escort wants to see, if you haven't
                already! We only save info you want us to save.
              </div>
            </div>
            <div
              style={{
                width: "18vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={require("./images/flash.svg")}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Submit
              </div>
              <div style={{ textAlign: "left", marginTop: 10, fontSize: 16 }}>
                Hit submit, and you're off to the races! If you chose to save
                your info, you won't have to submit anything next time!
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <div
              onClick={() => (window.location.href = "/getstartedclient")}
              id="get-started-button"
              style={{
                backgroundColor: "#008489",
                width: 180,
                padding: 10,
                color: "white",
                fontWeight: "600",
                height: 40,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
                fontSize: 18,
              }}
            >
              I'm a client
            </div>

            <div style={{ width: 15 }}></div>

            <div
              onClick={() => (window.location.href = "/getstarted")}
              id="get-started-button"
              style={{
                backgroundColor: "rgb(230, 30, 77)",
                width: 180,
                padding: 10,
                color: "white",
                height: 40,
                fontWeight: "600",
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
                fontSize: 18,
              }}
            >
              I'm an escort
            </div>
          </div>

          <div
            style={{
              marginTop: 50,
              fontSize: 28,
              fontWeight: 600,
              marginBottom: 30,
              color: "rgb(230, 30, 77)",
            }}
          >
            Advantages of Escora
          </div>
          <div style={{ width: "30vw", marginBottom: 30 }}>
            <div style={{ fontSize: 22, fontWeight: 500 }}>
              Keep your clients
            </div>
            <div style={{ height: 10 }}></div>
            <div style={{ color: "#515151", fontSize: 18 }}>
              We all know screening yourself scares clients away, and for good
              reason. We've created a way for your clients to be and feel safe,
              secure, know you're real, and quickly get through your screening
              process without worry.
            </div>
          </div>
          <div style={{ width: "30vw", marginBottom: 30 }}>
            <div style={{ fontSize: 22, fontWeight: 500 }}>Safety</div>
            <div style={{ height: 10 }}></div>
            <div style={{ color: "#515151", fontSize: 18 }}>
              From all the verified information you want, to client ratings &
              reviews from other Escorts this client has seen before, you can
              rest assured you're far safer than you've ever been screening
              yourself, or with anyone else.
            </div>
          </div>
          <div style={{ width: "30vw", marginBottom: 30 }}>
            <div style={{ fontSize: 22, fontWeight: 500 }}>
              Easy & Quick for Everyone
            </div>
            <div style={{ height: 10 }}></div>
            <div style={{ color: "#515151", fontSize: 18 }}>
              All you have to do is share a link, all they have to do is click
              it and give us some info. If you client has already used us, it's
              likely they won't have to fill out anything at all, and are done
              in a matter of seconds.
            </div>
          </div>
          <div style={{ width: "30vw", marginBottom: 30 }}>
            <div style={{ fontSize: 22, fontWeight: 500 }}>Privacy</div>
            <div style={{ height: 10 }}></div>
            <div style={{ color: "#515151", fontSize: 18 }}>
              We place privacy above ANYTHING else. We do NOT share data with
              ANYONE. Period. You are free to delete your data from our servers
              at anytime, anyplace.
            </div>
          </div>
        </div>

        <div style={{ height: 100 }}></div>
      </div>
    );
  }
}
