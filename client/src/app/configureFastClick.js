import FastClick from "fastclick";

export default () => {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      FastClick.attach(document.body);
      console.log("fast clicked attached");
    },
    false
  );
};
