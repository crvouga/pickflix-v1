import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import useModal from "../../app/modals/useModal";
import { AppBarGutter } from "../../common/components/AppBarGutter";
import {
  ResponsiveDialog,
  RESPONSIVE_DIALOG_MAX_WIDTH,
} from "../../common/components/ResponsiveDialog";
import { SlideRight } from "../../common/components/TransitionComponents";
import SearchTextField from "../../search/input/SearchTextField";
import { IDiscoverTag } from "../query/types";
import useDiscoverState from "../redux/useDiscoverState";
import { DiscoverTagsSearchFilter } from "./query";
import SearchResults from "./SearchResults";

export default () => {
  const { isOpen, close } = useModal("DiscoverSearch");
  const discoverState = useDiscoverState();

  const inputRef = useRef<HTMLInputElement>();

  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      focus();
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<
    DiscoverTagsSearchFilter | undefined
  >();

  const toggleSearchFilter = (selected: DiscoverTagsSearchFilter) => {
    setSearchFilter((searchFilter) =>
      searchFilter === selected ? undefined : selected
    );
  };

  useEffect(() => {
    if (isOpen) {
      handleClear();
      setSearchQuery("");
      setSearchFilter(undefined);
    }
  }, [isOpen]);

  const handleClick = (tag: IDiscoverTag) => {
    close();
    discoverState.clear();
    discoverState.activateTag(tag);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <ResponsiveDialog
      TransitionComponent={SlideRight}
      open={isOpen}
      onClose={close}
      keepMounted
    >
      <Box
        component={Paper}
        zIndex={2}
        position="fixed"
        width="100%"
        maxWidth={isMobile ? "100%" : RESPONSIVE_DIALOG_MAX_WIDTH}
      >
        <Box display="flex" p={1} paddingBottom={0}>
          <SearchTextField
            ref={inputRef}
            placeholder="Search Tags"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onClear={() => {
              handleClear();
            }}
          />
          {isMobile && (
            <Button color="primary" size="large" onClick={close}>
              Done
            </Button>
          )}
        </Box>
        <Box paddingX={2} paddingBottom={1} display="flex">
          {Object.values(DiscoverTagsSearchFilter).map((filter) => (
            <Box m={1 / 2} key={filter}>
              <Chip
                clickable
                label={filter}
                variant={filter === searchFilter ? "default" : "outlined"}
                onClick={() => {
                  focus();
                  toggleSearchFilter(filter);
                }}
              />
            </Box>
          ))}
        </Box>

        <Divider />
      </Box>

      <AppBarGutter />
      <AppBarGutter />

      <SearchResults
        onClick={handleClick}
        searchQuery={searchQuery}
        searchFilter={searchFilter}
      />
    </ResponsiveDialog>
  );
};
