import { AppBar, Toolbar, AppBarProps } from "@material-ui/core";
import React from "react";
import PickflixLogo from "../common/PickflixLogo";
import AccountButton from "./AccountButton";
import SearchButton from "./SearchButton";

export const APP_BAR_HEIGHT = "56px";

export default (props: AppBarProps) => {
  return (
    <AppBar color="default" position="sticky" {...props}>
      <Toolbar>
        <PickflixLogo flex={1} />
        <SearchButton />
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
};
