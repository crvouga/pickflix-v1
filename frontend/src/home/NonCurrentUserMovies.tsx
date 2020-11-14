import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import NewReleasesOutlinedIcon from "@material-ui/icons/NewReleasesOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import React from "react";
import { useQuery } from "react-query";
import HorizontalScroll from "../common/components/HorizontalScroll";
import MoviePosterScroll from "../movie/components/MoviePosterScroll";
import PersonAvatar from "../person/PersonAvatar";
import { getHomePage, queryKeys } from "./query";

export default () => {
  const query = useQuery(queryKeys.homePage(), () => getHomePage(), {});

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return null;
  }

  const {
    data: { personPopular, popular, topRated, upcoming, nowPlaying },
  } = query;

  return (
    <React.Fragment>
      <Box paddingBottom={1}>
        <ListItem>
          <ListItemIcon>
            <StarBorderOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Top Rated" />
        </ListItem>
        <MoviePosterScroll movies={topRated.results} />
      </Box>

      <Box paddingBottom={1}>
        <ListItem>
          <ListItemIcon>
            <TrendingUpOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Popular" />
        </ListItem>
        <MoviePosterScroll movies={popular.results} />
      </Box>

      <Box paddingBottom={1}>
        <ListItem>
          <ListItemIcon>
            <TheatersOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Now Playing" />
        </ListItem>
        <MoviePosterScroll movies={nowPlaying.results} />
      </Box>

      <Box paddingBottom={1}>
        <ListItem>
          <ListItemIcon>
            <NewReleasesOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Upcoming" />
        </ListItem>
        <MoviePosterScroll movies={upcoming.results} />
      </Box>

      <Box paddingBottom={1}>
        <ListItem>
          <ListItemIcon>
            <TrendingUpOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Popular People" />
        </ListItem>

        <HorizontalScroll paddingLeft={2}>
          {personPopular.results.map((person) => (
            <Box key={person.id} width="120px" marginRight={1}>
              <PersonAvatar person={person} />
              <Box p={1}>
                <Typography noWrap>{person.name}</Typography>
              </Box>
            </Box>
          ))}
        </HorizontalScroll>
      </Box>
    </React.Fragment>
  );
};
