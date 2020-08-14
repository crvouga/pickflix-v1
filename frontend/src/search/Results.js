import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import router from "../common/redux/router";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import search from "./redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import Poster from "../movie/components/Poster";
import Backdrop from "../movie/components/Backdrop";
import moment from "moment";

const ResultMovie = ({ movie, ...restOfProps }) => {
  return (
    <ListItem button {...restOfProps}>
      <ListItemText
        primary={movie.title}
        secondary={moment(movie.releaseDate).format("Y")}
      />
    </ListItem>
  );
};

const ResultPerson = ({ person, ...restOfProps }) => {
  return (
    <ListItem button {...restOfProps}>
      <ListItemAvatar>
        <Avatar src={makeTMDbImageURL(4, person)} />
      </ListItemAvatar>
      <ListItemText
        primary={person.name}
        secondary={person.knownForDepartment}
      />
    </ListItem>
  );
};

const Result = ({ result, ...restOfProps }) => {
  return (
    <>
      {result?.mediaType === "person" ? (
        <ResultPerson person={result} {...restOfProps} />
      ) : result?.mediaType === "movie" ? (
        <ResultMovie movie={result} {...restOfProps} />
      ) : null}
      <Divider />
    </>
  );
};

const TopResultMovie = ({ movie, ...restOfProps }) => {
  return (
    <Box {...restOfProps} width="100%" display="flex" flexDirection="row">
      <Box p={2}>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {moment(movie.releaseDate).format("Y")}
        </Typography>
      </Box>
    </Box>
  );
};

const TopResultPerson = ({ person, onClick, ...restOfProps }) => {
  return (
    <Box {...restOfProps}>
      <ResultPerson person={person} onClick={onClick} />
      <HorizontalScroll>
        {person.knownFor.map((movie) => (
          <Box key={movie.id} marginRight={1}>
            <Poster width="120px" movie={movie} />
          </Box>
        ))}
      </HorizontalScroll>
    </Box>
  );
};

const TopResult = ({ result, ...restOfProps }) => {
  return result?.mediaType === "person" ? (
    <TopResultPerson person={result} {...restOfProps} />
  ) : result?.mediaType === "movie" ? (
    <TopResultMovie movie={result} {...restOfProps} />
  ) : null;
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

  const handleClick = (result) => () => {
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
      <TopResult
        result={topResult}
        paddingTop={1}
        onClick={handleClick(topResult)}
      />
      <List>
        {bottomResults.map((result) => (
          <Result
            divider
            key={result.id}
            result={result}
            onClick={handleClick(result)}
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
