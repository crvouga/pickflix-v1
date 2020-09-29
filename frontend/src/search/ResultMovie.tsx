import React from "react";
import { Box, ButtonBase, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import router from "../redux/router";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import search from "./redux";
import Backdrop from "../movie/components/Backdrop";
import { Movie } from "../tmdb/types";
import { Result } from "./redux/types";

interface Props {
  movie: Movie;
}

export default ({ movie }: Props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(search.actions.chose(movie as Result));
    dispatch(router.actions.push({ pathname: `/movie/${movie.id}` }));
  };
  return (
    <Box width="100%" display="flex" flexDirection="row" onClick={handleClick}>
      <Backdrop movie={movie} width="180px" />
      <Box
        paddingLeft={1}
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography style={{ fontWeight: "bold" }}>{movie.title}</Typography>
        <Typography color="textSecondary" variant="body2">
          {movie.overview}
        </Typography>
      </Box>
    </Box>
  );
};
