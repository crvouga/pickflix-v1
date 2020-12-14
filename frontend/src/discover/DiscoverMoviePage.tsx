import { Box, Container, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { APP_BAR_HEIGHT } from "../app/navigation/constants";
import ResponsiveNavigation from "../app/navigation/ResponsiveNavigation";
import {
  AddButton,
  FolderButton,
  RedoButton,
  SaveButton,
  TuneButton,
  UndoButton,
} from "./Actions";
import DiscoverMovieResults from "./DiscoverMovieResults";
import DiscoverMovieTags from "./DiscoverMovieTags";
import { SaveDiscoverTagsFormModal } from "./form/save-discover-tags-form/SaveDiscoverTagsFormModal";
import SearchModal from "./search/SearchModal";
import TuneModal from "./TuneModal";
import { DiscoverTagsFormModal } from "./form/discover-tags-form/DiscoverTagsForm";

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
      <SaveDiscoverTagsFormModal />
      <DiscoverTagsFormModal />

      <ResponsiveNavigation />

      <Box className={classes.sticky}>
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <AddButton edge="start" />
            <TuneButton />
            <UndoButton />
            <RedoButton />
            <Box flex={1} />
            <FolderButton />
            <SaveButton />
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
