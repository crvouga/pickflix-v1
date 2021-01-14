import { AppBar, Box } from "@material-ui/core";
import React, { useEffect, useRef, useCallback } from "react";
import { useSearchState } from "../redux/search";
import SearchFilters from "./SearchFilters";
import SearchTextField from "./SearchTextField";

export default () => {
  const { toggleFilter, filter, setFilter, setText } = useSearchState();
  const inputRef = useRef<HTMLInputElement>();

  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setText("");
      setFilter(undefined);
    }
  }, [setFilter, setText]);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <AppBar position="sticky" color="default">
      <Box p={1}>
        <SearchTextField
          ref={inputRef}
          onClear={() => {
            clear();
            focus();
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </Box>
      <Box>
        <SearchFilters
          filter={filter}
          onClick={(newFilter) => {
            focus();
            toggleFilter(newFilter);
          }}
        />
      </Box>
    </AppBar>
  );
};
