import React, { useRef, ChangeEvent, useState } from "react";
import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  InputBase,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import BackButton from "../navigation/BackButton";
import useModal from "../navigation/modals/useModal";
import { useQuery } from "react-query";
import {
  queryKeys,
  getSearchPerson,
  getSearchKeyword,
  getSearchCompany,
} from "./query";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";

import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import {
  DiscoverMovieTag,
  WithPeopleTag,
  WithCompaniesTag,
  WithKeywordsTag,
} from "./discover-movie-tags";
import { useDispatch } from "react-redux";
import { discoverMovie } from "./redux/discover-movie";

const SearchResults = ({
  searchQuery,
  onClick,
}: {
  searchQuery: string;
  onClick: (tag: DiscoverMovieTag) => void;
}) => {
  const personSearchQuery = useQuery(queryKeys.personSearch(searchQuery), () =>
    getSearchPerson({ query: searchQuery })
  );

  const keywordSearchQuery = useQuery(
    queryKeys.keywordSearch(searchQuery),
    () => getSearchKeyword({ query: searchQuery })
  );

  const companySearchQuery = useQuery(
    queryKeys.companySearch(searchQuery),
    () => getSearchCompany({ query: searchQuery })
  );

  if (
    personSearchQuery.error ||
    keywordSearchQuery.error ||
    companySearchQuery.error
  ) {
    return <ErrorBox />;
  }

  if (
    !personSearchQuery.data ||
    !keywordSearchQuery.data ||
    !companySearchQuery.data
  ) {
    return <LoadingBox m={4} />;
  }

  const withPeopleTags: WithPeopleTag[] = personSearchQuery.data.results.map(
    (result) => ({
      type: "withPeople",
      ...result,
    })
  );

  const withKeywordsTags: WithKeywordsTag[] = keywordSearchQuery.data.results.map(
    (result) => ({
      type: "withKeywords",
      ...result,
    })
  );

  const withCompaniesTags: WithCompaniesTag[] = companySearchQuery.data.results.map(
    (result) => ({
      type: "withCompanies",
      ...result,
    })
  );

  const handleClick = (tag: DiscoverMovieTag) => () => onClick(tag);

  return (
    <React.Fragment>
      {withPeopleTags.map((tag) => (
        <ListItem button key={tag.id} onClick={handleClick(tag)}>
          <ListItemAvatar>
            <Avatar
              src={makeTMDbImageURL(1, {
                profilePath: tag.profilePath,
              })}
            />
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Person" />
        </ListItem>
      ))}
      {withKeywordsTags.map((tag) => (
        <ListItem button key={tag.id} onClick={handleClick(tag)}>
          <ListItemText primary={tag.name} secondary="Keyword" />
        </ListItem>
      ))}
      {withCompaniesTags.map((tag) => (
        <ListItem button key={tag.id} onClick={handleClick(tag)}>
          <ListItemAvatar>
            <Avatar src={makeTMDbImageURL(1, { logoPath: tag.logoPath })} />
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Company" />
        </ListItem>
      ))}
    </React.Fragment>
  );
};

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
}));

const SearchBar = ({ onChange }: { onChange: (query: string) => void }) => {
  const handleChange = (e: ChangeEvent<{ value: string }>) => {
    const query = e.target.value;
    onChange(query);
  };

  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <BackButton />
        <InputBase
          placeholder="Search Person, Keyword, Company"
          onChange={handleChange}
          autoFocus
          style={{ flex: 1 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default () => {
  const dispatch = useDispatch();
  const classesDialog = useStylesDialog();
  const discoverMovieTagSearchModal = useModal("DiscoverMovieTagSearch");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (searchQuery: string) => {
    setSearchQuery(encodeURI(searchQuery));
  };

  const handleClick = (tag: DiscoverMovieTag) => {
    discoverMovieTagSearchModal.close();
    dispatch(discoverMovie.actions.setActiveTags([tag]));
  };

  return (
    <Dialog
      fullScreen
      classes={classesDialog}
      open={discoverMovieTagSearchModal.isOpen}
    >
      <SearchBar onChange={handleChange} />
      {searchQuery.length > 0 && (
        <SearchResults onClick={handleClick} searchQuery={searchQuery} />
      )}
    </Dialog>
  );
};
