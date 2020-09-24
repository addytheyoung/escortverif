const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const functions = require("firebase-functions");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.send({ working: "Working!" });
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));

exports.app = functions.https.onRequest(app);
