import {
  AppBar,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  Paper,
  Divider,
  Chip,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveDialog,
  RESPONSIVE_DIALOG_MAX_WIDTH,
} from "../../common/components/ResponsiveDialog";
import useModal from "../../app/modals/useModal";
import SearchTextField from "../../search/input/SearchTextField";
import { IDiscoverTag } from "../query/types";
import useDiscoverState from "../redux/useDiscoverState";
import SearchResults from "./SearchResults";
import { AppBarGutter } from "../../common/components/AppBarGutter";
import { SlideRight } from "../../common/components/TransitionComponents";
import { DiscoverTagsSearchFilter } from "../../search/query";

export default () => {
  const { isOpen, close } = useModal("DiscoverSearch");
  const discoverState = useDiscoverState();

  const inputRef = useRef<HTMLInputElement>();

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
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
        <Box display="flex" p={1}>
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
        <Box paddingX={2} paddingY={1} display="flex">
          {Object.values(DiscoverTagsSearchFilter).map((filter) => (
            <Box m={1 / 2} key={filter}>
              <Chip
                clickable
                label={filter}
                variant={filter === searchFilter ? "default" : "outlined"}
                onClick={() => {
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
