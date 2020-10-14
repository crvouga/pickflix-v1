import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import PickflixLogo from "../common/PickflixLogo";
import AccountButton from "./AccountButton";
import SearchButton from "./SearchButton";

export const APP_BAR_HEIGHT = "56px";

export default () => {
  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <PickflixLogo />
        <SearchButton />
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
};
