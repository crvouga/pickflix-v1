import { Box, Container, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { APP_BAR_HEIGHT } from "../app/navigation/constants";
import ResponsiveNavigation from "../app/navigation/ResponsiveNavigation";
import { AddButton, RedoButton, TuneButton, UndoButton } from "./Actions";
import DiscoverMovieResults from "./DiscoverMovieResults";
import DiscoverMovieTags from "./DiscoverMovieTags";
import SearchModal from "./search/SearchModal";
import TuneModal from "./TuneModal";

const useStyles = makeStyles((theme) => ({
  sticky: {
    backgroundColor: theme.palette.background.paper,
    position: "sticky",
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down("xs")]: {
      top: 0,
    },
    [theme.breakpoints.up("sm")]: {
      top: APP_BAR_HEIGHT,
    },
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <SearchModal />
      <TuneModal />

      <ResponsiveNavigation />

      <Box className={classes.sticky}>
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <AddButton edge="start" />
            <TuneButton />
            <UndoButton />
            <RedoButton />
          </Toolbar>

          <Box paddingBottom={2}>
            <DiscoverMovieTags />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" disableGutters>
        <DiscoverMovieResults />
      </Container>
    </React.Fragment>
  );
};
