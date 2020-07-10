import { AppBar, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import SearchHistory from "./components/SearchHistory";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import useSearchState from "./hooks/useSearchState";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  subtitle: {
    paddingLeft: theme.spacing(1),
  },
  paginationContainer: {
    textAlign: "center",
    margin: "auto",
  },
  paginationRoot: {
    textAlign: "center",
    margin: "auto",
  },
  paginationUl: {
    paddingLeft: "auto",
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchSubtitle = ({ searchState }) => {
  const classes = useStyles();
  const { query, deferredText, totalResults, page } = searchState;

  const subtitle =
    query.status === "loading"
      ? "searching..."
      : deferredText === ""
      ? ""
      : totalResults === 0
      ? `No results for "${deferredText}"`
      : `Showing results for "${deferredText}"`;

  return (
    <Typography
      className={classes.subtitle}
      variant="subtitle2"
      color="textSecondary"
      gutterBottom
    >
      {subtitle}
    </Typography>
  );
};

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const searchState = useSearchState();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    searchState.setText("");
  }, []);

  const handleClear = () => {
    inputRef.current.focus();
    searchState.setText("");
  };

  const handleResultClick = (result) => {
    history.push(`/${result.mediaType}/${result.id}`);
    searchState.addHistory(result);
  };

  const handlePageChange = (e, newPage) => {
    searchState.setPage(newPage);
  };

  const handleInputChange = (e) => {
    searchState.setText(e.target.value);
  };

  return (
    <div>
      <AppBar className={classes.appBar} position="sticky" color="default">
        <SearchBar
          loading={searchState.query.status === "loading"}
          onClear={handleClear}
          InputBaseProps={{
            inputRef: inputRef,
            value: searchState.text,
            placeholder: "Search Movie or Person",
            onChange: handleInputChange,
          }}
        />
      </AppBar>

      {searchState.deferredText === "" ? (
        <SearchHistory
          history={searchState.history}
          onResultClick={handleResultClick}
          onClearHistory={searchState.clearHistory}
        />
      ) : (
        <React.Fragment>
          <SearchSubtitle searchState={searchState} />
          <SearchResults
            results={searchState.results}
            onPageChange={searchState.setPage}
            onResultClick={handleResultClick}
          />
          {/* TODO: add pagination */}
          {/* <Pagination
            page={searchState.page}
            onChange={handlePageChange}
            variant="outlined"
            classes={{
              root: classes.paginationRoot,
              ul: classes.paginationUl,
            }}
            siblingCount={0}
            count={searchState.totalPages}
          /> */}
        </React.Fragment>
      )}
    </div>
  );
};
