import React from "react";
import { Box, ButtonBase, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import router from "../common/redux/router";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import search from "./redux";
import Backdrop from "../movie/components/Backdrop";

export default ({ movie }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(search.actions.chose(movie));
    dispatch(router.actions.push(`/movie/${movie.id}`));
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
