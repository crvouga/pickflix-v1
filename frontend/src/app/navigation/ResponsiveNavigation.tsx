import { Hidden } from "@material-ui/core";
import React from "react";
import NavigationDesktop from "./Navigation.Desktop";
import NavigationMobile from "./Navigation.Mobile";

export default () => {
  return (
    <React.Fragment>
      <Hidden xsDown>
        <NavigationDesktop />
      </Hidden>
      <Hidden smUp>
        <NavigationMobile />
      </Hidden>
    </React.Fragment>
  );
};
