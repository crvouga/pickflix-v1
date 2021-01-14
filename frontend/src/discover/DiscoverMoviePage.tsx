import { Box, Container, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
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
import DiscoverTag from "./components/DiscoverTag";
import DiscoverMovieResults from "./DiscoverMovieResults";
import { DiscoverTagsFormModal } from "./form/discover-tags-form/DiscoverTagsForm";
import { SaveDiscoverTagsFormModal } from "./form/save-discover-tags-form/SaveDiscoverTagsFormModal";
import useDiscoverState from "./redux/useDiscoverState";
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
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "scroll",
    overflowY: "hidden",
    transform: "translateZ(0)",
    "& *": {
      flexShrink: 0,
    },
    scrollSnapType: "x mandatory",
  },
  chipWrapper: {
    scrollSnapAlign: "start",
  },
}));

export default () => {
  const classes = useStyles();

  const {
    activeTags,
    nonActiveTags,
    deactivateTag,
    activateTag,
  } = useDiscoverState();

  const chipContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chipContainerRef.current) {
      chipContainerRef.current.scrollLeft = 0;
    }
  }, [activeTags.length]);

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
            <div ref={chipContainerRef} className={classes.chipContainer}>
              {activeTags.map((tag) => (
                <Box
                  key={tag.id}
                  marginRight={1}
                  className={classes.chipWrapper}
                >
                  <DiscoverTag
                    tag={tag}
                    onClick={() => {
                      deactivateTag(tag);
                    }}
                    clickable
                    variant="default"
                  />
                </Box>
              ))}
              {nonActiveTags.map((tag) => (
                <Box
                  key={tag.id}
                  marginRight={1}
                  className={classes.chipWrapper}
                >
                  <DiscoverTag
                    tag={tag}
                    onClick={() => {
                      activateTag(tag);
                    }}
                    clickable
                    variant="outlined"
                  />
                </Box>
              ))}
            </div>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" disableGutters>
        <DiscoverMovieResults />
      </Container>
    </React.Fragment>
  );
};
