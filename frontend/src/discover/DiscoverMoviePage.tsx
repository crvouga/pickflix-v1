import { Box, Container, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import NavBar, { APP_BAR_HEIGHT } from "../navigation/NavBar";
import { AddButton, RedoButton, TuneButton, UndoButton } from "./Actions";
import DiscoverMovieResults from "./DiscoverMovieResults";
import SearchModal from "./search/SearchModal";
import DiscoverMovieTags from "./TagScroll";
import TuneModal from "./TuneModal";

const useStyles = makeStyles((theme) => ({
  sticky: {
    backgroundColor: theme.palette.background.paper,
    position: "sticky",
    top: APP_BAR_HEIGHT,
    zIndex: theme.zIndex.appBar,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <SearchModal />
      <TuneModal />
      <NavBar />

      <Container maxWidth="md" disableGutters>
        <Box className={classes.sticky}>
          <Toolbar>
            <AddButton edge="start" />
            <TuneButton />
            <UndoButton />
            <RedoButton />
          </Toolbar>

          <Box paddingBottom={2}>
            <DiscoverMovieTags />
          </Box>
        </Box>
        <DiscoverMovieResults />
      </Container>
    </React.Fragment>
  );
};
