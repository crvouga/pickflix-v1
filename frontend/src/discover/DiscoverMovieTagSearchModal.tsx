import {
  AppBar,
  Avatar,
  Dialog,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useDebounce } from "use-debounce";

import matchSorter from "match-sorter";
import { union, uniqBy } from "ramda";
import React, { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import BackButton from "../navigation/BackButton";
import useModal from "../navigation/modals/useModal";
import { useSelector } from "../redux/react-redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import {
  DiscoverMovieTag,
  WithCompaniesTag,
  WithKeywordsTag,
  WithPeopleTag,
} from "./discover-movie-tags";
import {
  getSearchCompany,
  getSearchKeyword,
  getSearchPerson,
  queryKeys,
} from "./query";
import { discoverMovie } from "./redux/discover-movie";

const Result = ({ tag }: { tag: DiscoverMovieTag }) => {
  switch (tag.type) {
    case "withPeople":
      return (
        <ListItem button>
          <ListItemAvatar>
            <Avatar
              src={makeTMDbImageURL(1, {
                profilePath: tag.profilePath,
              })}
            />
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Person" />
        </ListItem>
      );
    case "withCompanies":
      return (
        <ListItem button>
          <ListItemAvatar>
            <Avatar src={makeTMDbImageURL(1, { logoPath: tag.logoPath })} />
          </ListItemAvatar>
          <ListItemText primary={tag.name} secondary="Company" />
        </ListItem>
      );

    case "withKeywords":
      return (
        <ListItem button>
          <ListItemText primary={tag.name} secondary="Keyword" />
        </ListItem>
      );

    case "withGenres":
      return (
        <ListItem button>
          <ListItemText primary={tag.name} secondary="Genre" />
        </ListItem>
      );

    default:
      return (
        <ListItem button>
          <ListItemText primary={tag.name} />
        </ListItem>
      );
  }
};

const SearchResults = ({
  searchQuery,
  onClick,
}: {
  searchQuery: string;
  onClick: (tag: DiscoverMovieTag) => void;
}) => {
  const handleClick = (tag: DiscoverMovieTag) => () => onClick(tag);

  const tags = useSelector(discoverMovie.selectors.tags);

  const [debounced] = useDebounce(encodeURI(searchQuery.trim()), 500);

  const personSearchQuery = useQuery(queryKeys.personSearch(debounced), () => {
    const source = axios.CancelToken.source();
    const promise = getSearchPerson({ query: debounced });
    //@ts-ignore
    promise.cancel = () => {
      source.cancel("Query was cancelled by React Query");
    };
    return promise;
  });

  const keywordSearchQuery = useQuery(
    queryKeys.keywordSearch(debounced),
    () => {
      const source = axios.CancelToken.source();
      const promise = getSearchKeyword({ query: debounced });
      //@ts-ignore
      promise.cancel = () => {
        source.cancel("Query was cancelled by React Query");
      };
      return promise;
    }
  );

  const companySearchQuery = useQuery(
    queryKeys.companySearch(debounced),
    () => {
      const source = axios.CancelToken.source();
      const promise = getSearchCompany({ query: debounced });
      //@ts-ignore
      promise.cancel = () => {
        source.cancel("Query was cancelled by React Query");
      };
      return promise;
    }
  );

  if (
    !personSearchQuery.data ||
    !keywordSearchQuery.data ||
    !companySearchQuery.data
  ) {
    return (
      <List>
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </List>
    );
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

  const allTags = uniqBy((tag) => tag.id, [
    ...tags,
    ...withPeopleTags,
    ...withKeywordsTags,
    ...withCompaniesTags,
  ]);

  const sortedTags: DiscoverMovieTag[] = matchSorter(allTags, searchQuery, {
    keys: ["name"],
  });

  return (
    <List>
      {sortedTags.map((tag) => (
        <div key={tag.id} onClick={handleClick(tag)}>
          <Result tag={tag} />
        </div>
      ))}
    </List>
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
  const activeTags = useSelector(discoverMovie.selectors.activeTags);
  const classesDialog = useStylesDialog();
  const discoverMovieTagSearchModal = useModal("DiscoverMovieTagSearch");
  const [searchQuery, setSearchQuery] = useState("");

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
      <SearchBar onChange={setSearchQuery} />

      <SearchResults onClick={handleClick} searchQuery={searchQuery} />
    </Dialog>
  );
};
