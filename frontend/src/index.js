import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";

// remove click delay on mobile devices
import FastClick from "fastclick";
document.addEventListener(
  "DOMContentLoaded",
  () => {
    FastClick.attach(document.body);
    console.log("Fast clicked attached");
  },
  false
);

ReactDOM.render(<App />, document.getElementById("root"));
