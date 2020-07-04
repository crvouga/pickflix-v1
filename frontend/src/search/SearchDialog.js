import { AppBar, Dialog, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import modal from "../common/redux/modal";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import SearchResults from "./SearchResults";
import useSearchState from "./useSearchState";

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
  const isOpen = useSelector(modal.selectors.isOpen("searchDialog"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    } else {
      searchState.setText("");
    }
  }, [isOpen]);

  const handleOpen = () => {
    dispatch(modal.actions.open("searchDialog"));
  };
  const handleClose = () => {
    dispatch(modal.actions.close("searchDialog"));
  };

  const handleClear = () => {
    inputRef.current.focus();
    searchState.setText("");
  };

  const handleResultClick = (result) => {
    handleClose();
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
    <Dialog
      keepMounted
      PaperProps={{ className: classes.paper }}
      fullScreen
      open={isOpen}
      onClose={handleClose}
    >
      <AppBar className={classes.appBar} position="sticky" color="default">
        <SearchBar
          loading={searchState.query.status === "loading"}
          onClear={handleClear}
          onBack={handleClose}
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
    </Dialog>
  );
};
