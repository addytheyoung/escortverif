const functions = require("firebase-functions");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// The Firebase Admin SDK to access Cloud Firestore.
var nodemailer = require("nodemailer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var admin = require("firebase-admin");

var serviceAccount = require("./service.json");

console.log("YIO{{{{{");

admin.initializeApp();

app.get("/test", (req, res) => {
  res.send({ working: "Working!" });
});

app.post("/send-email", (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const text = req.body.text;
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "andrew@collection.deals",
      pass: "Collection#0831",
    },
  });

  var mailOptions = {
    from: "andrew@collection.deals",
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

// process.on("SIGINT", function () {
//   console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
//   // some other closing procedures go here
//   process.exit(1);
// });

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
exports.test = functions.https.onRequest(app);

exports.removeData = functions.pubsub
  .schedule("every 48 hours")
  .timeZone("America/New_York")
  .onRun((context) => {
    var prevDate = new Date("09/26/2020");
    var currentDate = new Date();
    var Difference_In_Time = currentDate.getTime() - prevDate.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if (Difference_In_Days > 3) {
      // Remove it
    }

    console.log(Difference_In_Days);
  });
