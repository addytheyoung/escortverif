import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import RenderRoutes from "./RenderRoutes";
import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABfcsTRyNpLBUqt4_DsLFiAlM8YDaF50E",
  authDomain: "escverif.firebaseapp.com",
  databaseURL: "https://escverif.firebaseio.com",
  projectId: "escverif",
  storageBucket: "escverif.appspot.com",
  messagingSenderId: "894112540630",
  appId: "1:894112540630:web:434438baec00ffb40fa677",
  measurementId: "G-EV8B2VCPNR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged((firebase) => {
  ReactDOM.render(<RenderRoutes />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
