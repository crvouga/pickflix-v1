import {
  AppBar,
  Box,
  Button,
  Dialog,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useModal from "../navigation/modals/useModal";
import SearchHistoryList from "./SearchHistoryList";
import SearchResultList from "./SearchResultList";
import SearchTextField from "./SearchTextField";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
      marginBottom: "auto",
      minHeight: "360px",
      maxHeight: "480px",
      width: "480px",
    },
  },
}));

const CloseButton = () => {
  const searchModal = useModal("Search");

  return (
    <Button size="large" onClick={searchModal.close} color="primary">
      Done
    </Button>
  );
};

export default () => {
  const classesDialog = useStylesDialog();
  const searchModal = useModal("Search");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
  }, [searchModal.isOpen]);

  return (
    <Dialog
      classes={classesDialog}
      fullScreen={isMobile}
      open={searchModal.isOpen}
      onClose={searchModal.close}
      transitionDuration={0}
    >
      <AppBar position="sticky" color="default">
        <Box p={1} display="flex">
          <SearchTextField onChange={setText} />
          {isMobile && <CloseButton />}
        </Box>
      </AppBar>

      {text.trim().length === 0 ? (
        <SearchHistoryList />
      ) : (
        <SearchResultList text={text} />
      )}
    </Dialog>
  );
};
