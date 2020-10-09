import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import discover from "../../discover/redux";
import { makeTag, Tag as ITag } from "../../discover/redux/types";
import router from "../../redux/router";
import { MoviePageData, useMoviePageQuery } from "../data";
import TagScroll from "./TagScroll";

const useStyles = makeStyles((theme) => ({
  paddingLeft: {
    paddingLeft: theme.spacing(2),
  },
}));

export default () => {
  const query = useMoviePageQuery();
  if (!query.data) return null;

  const { keywords, ...details } = query.data;

  const classes = useStyles();

  const keywordTags = keywords.keywords.map(makeTag("keyword"));
  const genreTags = details.genres.map(makeTag("genre"));
  const companyTags = details.productionCompanies.map(makeTag("company"));

  const dispatch = useDispatch();

  const handleTagClick = (tag: ITag) => {
    dispatch(discover.actions.setActiveTags([tag]));
    dispatch(router.actions.push({ pathname: "/discover" }));
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
