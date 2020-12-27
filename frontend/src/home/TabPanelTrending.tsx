import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import NewReleasesOutlinedIcon from "@material-ui/icons/NewReleasesOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import React from "react";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../media/tmdb/query";
import { MoviePosterScrollInfinite } from "../movie/components/MoviePosterScroll";
import { sortBy } from "ramda";
import { Paginated } from "../common/types";
import { Movie } from "../movie/components/MoviePosterCard";

const shuffle = sortBy(Math.random);
//why?: so popular, now playing, and trending sections looks different
const shufflePage = (page: Paginated<Movie>) => ({
  ...page,
  results: shuffle(page.results),
});

export const TabPanelTrending = () => {
  return (
    <React.Fragment>
      <ListItem>
        <ListItemIcon>
          <StarBorderOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Top Rated"
        />
      </ListItem>
      <MoviePosterScrollInfinite
        queryFn={getTopRatedMovies}
        queryKey={["top rating", "movies"]}
      />

      <ListItem>
        <ListItemIcon>
          <TrendingUpOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Popular"
        />
      </ListItem>
      <MoviePosterScrollInfinite
        queryFn={getPopularMovies}
        queryKey={["popular", "movies"]}
        mapPage={shufflePage}
      />

      <ListItem>
        <ListItemIcon>
          <TheatersOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Now Playing"
        />
      </ListItem>
      <MoviePosterScrollInfinite
        queryFn={getNowPlayingMovies}
        queryKey={["now playing", "movies"]}
        mapPage={shufflePage}
      />

      <ListItem>
        <ListItemIcon>
          <NewReleasesOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Upcoming"
        />
      </ListItem>
      <MoviePosterScrollInfinite
        queryFn={getUpcomingMovies}
        queryKey={["now playing", "movies"]}
        mapPage={shufflePage}
      />
    </React.Fragment>
  );
};
