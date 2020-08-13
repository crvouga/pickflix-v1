import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import router from "../common/redux/router";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import search from "./redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import Poster from "../movie/components/Poster";

const Result = ({ result, ...restOfProps }) => {
  return (
    <ListItem button {...restOfProps}>
      {result.mediaType === "person" && (
        <ListItemAvatar>
          <Avatar src={makeTMDbImageURL(4, result)} />
        </ListItemAvatar>
      )}
      <ListItemText primary={result.name || result.title} />
    </ListItem>
  );
};

export default () => {
  const dispatch = useDispatch();
  const results = useSelector(search.selectors.results);
  const status = useSelector(search.selectors.status);
  const [triggerRef, inView] = useInView();

  useEffect(() => {
    if (inView) {
      dispatch(search.actions.fetch());
    }
  }, [inView]);

  const handleResultClick = (result) => () => {
    dispatch(search.actions.chose(result));
    if (result.mediaType === "movie") {
      dispatch(router.actions.push(`/movie/${result.id}`));
    }
    if (result.mediaType === "person") {
      dispatch(router.actions.push(`/person/${result.id}`));
    }
  };

  const [topResult, ...bottomResults] = results;

  return (
    <div>
      <List>
        {topResult && topResult.mediaType === "person" && (
          <React.Fragment>
            <Result result={topResult} onClick={handleResultClick(topResult)} />
            <HorizontalScroll>
              {topResult.knownFor.map((movie) => (
                <Box key={movie.id} marginRight={1}>
                  <Poster width="120px" movie={movie} />
                </Box>
              ))}
            </HorizontalScroll>
          </React.Fragment>
        )}
        {topResult && topResult.mediaType === "movie" && (
          <React.Fragment>
            <Result
              result={topResult}
              divider
              onClick={handleResultClick(topResult)}
            />
          </React.Fragment>
        )}

        {bottomResults.map((result) => (
          <Result
            key={result.id}
            result={result}
            onClick={handleResultClick(result)}
          />
        ))}
      </List>
      {status === "loading" && (
        <Box p={2} textAlign="center">
          <CircularProgress />
        </Box>
      )}
      <div ref={triggerRef} />
    </div>
  );
};
