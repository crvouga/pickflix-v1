import FastClick from "fastclick";

export default () => {
  if ("addEventListener" in document) {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        FastClick.attach(document.body);
      },
      false
    );
  }
};
