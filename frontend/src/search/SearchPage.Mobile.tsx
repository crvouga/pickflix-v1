import { AppBar, Box } from "@material-ui/core";
import React, { useState } from "react";
import NavigationMobile from "../navigation/Navigation.Mobile";
import SearchHistoryList from "./SearchHistoryList";
import SearchResultList from "./SearchResultList";
import SearchTextField from "./SearchTextField";

export default () => {
  const [text, setText] = useState("");

  return (
    <React.Fragment>
      <NavigationMobile />

      <AppBar position="sticky" color="default">
        <Box p={1} display="flex">
          <SearchTextField onChange={setText} />
        </Box>
      </AppBar>

      {text.trim().length === 0 ? (
        <SearchHistoryList />
      ) : (
        <SearchResultList text={text} />
      )}
    </React.Fragment>
  );
};
