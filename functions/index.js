const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
var nodemailer = require("nodemailer");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(1);
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
exports.app = functions.https.onRequest(app);
