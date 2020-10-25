import React from "react";
import LoadingBox from "../common/components/LoadingBox";
import NavigationBar from "./AccountPage.NavigationBar";

export default () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <LoadingBox m={6} />
    </React.Fragment>
  );
};
