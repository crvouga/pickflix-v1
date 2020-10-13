import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  discoverMovie,
  DiscoverMovieTag,
} from "../../discover/redux/discover-movie";

import { useMoviePageQuery } from "../data";
import TagScroll from "./TagScroll";

const useStyles = makeStyles((theme) => ({
  paddingLeft: {
    paddingLeft: theme.spacing(2),
  },
}));

export default () => {
  const history = useHistory();
  const query = useMoviePageQuery();
  if (!query.data) return null;

  const { keywords, ...details } = query.data;

  const classes = useStyles();

  const keywordTags: DiscoverMovieTag[] = []; // keywords.keywords.map(makeTag("keyword"));
  const genreTags: DiscoverMovieTag[] = []; //details.genres.map(makeTag("genre"));
  const companyTags: DiscoverMovieTag[] = []; //details.productionCompanies.map(makeTag("company"));

  const dispatch = useDispatch();

  const handleTagClick = (tag: DiscoverMovieTag) => {
    dispatch(discoverMovie.actions.setActiveTags([tag]));
    history.push("/discover");
  };

  return (
    <React.Fragment>
      <Typography gutterBottom className={classes.paddingLeft} variant="h6">
        Explore
      </Typography>
      <Typography className={classes.paddingLeft}>Genres</Typography>
      <TagScroll tags={genreTags} onClick={handleTagClick} />
      <Typography className={classes.paddingLeft}>Companies</Typography>
      <TagScroll tags={companyTags} onClick={handleTagClick} />
      <Typography className={classes.paddingLeft}>Keywords</Typography>
      <TagScroll tags={keywordTags} onClick={handleTagClick} />
    </React.Fragment>
  );
};
