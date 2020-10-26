import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import matchSorter from "match-sorter";
import { groupBy } from "ramda";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import { BackendAPI } from "../../backend-api";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import ErrorPage from "../../common/page/ErrorPage";
import {
  MovieCreditCast,
  MovieCreditCrew,
  MovieCredits,
} from "../../tmdb/types";
import CreditsListItem from "./CreditsListItem";

type CreditsListProps = {
  creditsByDepartment: {
    [key: string]: (MovieCreditCast | MovieCreditCrew)[];
  };
};

const CreditsList = ({ creditsByDepartment }: CreditsListProps) => {
  return (
    <List>
      {Object.entries(creditsByDepartment).map(([department, credits]) => (
        <React.Fragment key={department}>
          <ListItem divider>
            <ListItemText
              primaryTypographyProps={{
                variant: "h6",
                style: { fontWeight: "bold" },
              }}
              primary={department}
            />
          </ListItem>
          {credits.map((credit) => (
            <CreditsListItem key={credit.creditId} credit={credit} />
          ))}
        </React.Fragment>
      ))}
    </List>
  );
};

type SearchBarProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  searchValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onBack: () => void;
};

const SearchBar = ({
  inputRef,
  searchValue,
  onBack,
  onChange,
  onClear,
}: SearchBarProps) => {
  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <IconButton edge="start" onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <InputBase
          style={{ flex: 1 }}
          inputRef={inputRef}
          placeholder="Search credits..."
          onChange={onChange}
        />
        <IconButton edge="end" disabled={searchValue === ""} onClick={onClear}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const SkeletonPage = () => {
  const dummyRef = useRef<HTMLInputElement>(null);
  const handleClear = () => {};
  const onBack = () => {};
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <div>
      <SearchBar
        inputRef={dummyRef}
        searchValue={""}
        onChange={handleChange}
        onClear={handleClear}
        onBack={onBack}
      />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <ListItemSkeleton key={n} />
      ))}
    </div>
  );
};

const fetchMovieCredits = (tmdbMediaId: string) =>
  BackendAPI.get<MovieCredits>(`/api/tmdb/movie/${tmdbMediaId}/credits`).then(
    (res) => res.data
  );

export default () => {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState("");

  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();

  const query = useQuery(`/movie/${tmdbMediaId}/credits`, () =>
    fetchMovieCredits(tmdbMediaId)
  );

  if (query.isError) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <SkeletonPage />;
  }

  const credits = query.data;

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    setSearchText("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleBack = () => {
    history.goBack();
  };

  const { cast, crew } = credits;

  const sortedCast = matchSorter(cast, searchText, {
    keys: ["name", "character"],
  });

  const sortedCrew = matchSorter(crew, searchText, {
    keys: ["name", "job", "department", "character"],
  });

  const crewByDepartment = groupBy(
    (crewCredit) => crewCredit?.department || "Crew",
    sortedCrew
  );

  const creditsByDepartment = {
    ...(sortedCast.length > 0 ? { Cast: sortedCast } : {}),
    ...crewByDepartment,
  };

  return (
    <div>
      <SearchBar
        inputRef={inputRef}
        searchValue={searchText}
        onChange={handleChange}
        onClear={handleClear}
        onBack={handleBack}
      />
      {Object.entries(creditsByDepartment).length === 0 && (
        <Box p={3}>
          <Typography align="center" color="textSecondary">
            Couldn't find anything for "{searchText}"
          </Typography>
        </Box>
      )}
      <CreditsList creditsByDepartment={creditsByDepartment} />
    </div>
  );
};
