import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { DiscoverMovieTag, TagType } from "../../../discover/query/types";
import { discoverActiveTags } from "../../../discover/redux/discover-active-tags";
import { useMoviePageQuery } from "../../data";
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

  const keywordTags: DiscoverMovieTag[] = keywords.keywords.map((keyword) => ({
    type: TagType.withKeywords,
    ...keyword,
  }));

  const genreTags: DiscoverMovieTag[] = details.genres.map((genre) => ({
    type: TagType.withGenres,
    ...genre,
  }));

  const companyTags: DiscoverMovieTag[] = details.productionCompanies.map(
    (company) => ({
      type: TagType.withCompanies,
      ...company,
    })
  );

  const dispatch = useDispatch();

  const handleTagClick = (tag: DiscoverMovieTag) => {
    dispatch(discoverActiveTags.actions.setActiveTags([tag]));
    history.push("/discover");
  };

  return (
    <React.Fragment>
      {(genreTags.length > 0 ||
        companyTags.length > 0 ||
        keywordTags.length > 0) && (
        <Typography gutterBottom className={classes.paddingLeft} variant="h6">
          Explore
        </Typography>
      )}

      {genreTags.length > 0 && (
        <React.Fragment>
          <Typography className={classes.paddingLeft}>Genres</Typography>
          <TagScroll tags={genreTags} onClick={handleTagClick} />
        </React.Fragment>
      )}

      {companyTags.length > 0 && (
        <React.Fragment>
          <Typography className={classes.paddingLeft}>Companies</Typography>
          <TagScroll tags={companyTags} onClick={handleTagClick} />
        </React.Fragment>
      )}

      {keywordTags.length > 0 && (
        <React.Fragment>
          <Typography className={classes.paddingLeft}>Keywords</Typography>
          <TagScroll tags={keywordTags} onClick={handleTagClick} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
