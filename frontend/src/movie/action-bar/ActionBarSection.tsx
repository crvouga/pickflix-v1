import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import AutoListToggleButton from "../../lists/auto-list/AutoListToggleButton";
import useActions from "./useActions";

const useStylesIconButton = makeStyles((theme) => ({
  root: {
    color: theme.palette.action.active,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.5em",
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
}));

export default () => {
  const classesIconButton = useStylesIconButton();
  const { movieId } = useParams<{ movieId: string }>();

  const movieActions = useActions({
    tmdbMediaId: movieId,
    tmdbMediaType: "movie",
  });

  const actionBarItems = [movieActions.addListItem, movieActions.watchWith];

  return (
    <Box display="flex" justifyContent="space-around" flexWrap="nowrap">
      <AutoListToggleButton
        autoListKey="liked"
        tmdbMediaId={movieId}
        tmdbMediaType="movie"
      />
      <AutoListToggleButton
        autoListKey="watch-next"
        tmdbMediaId={movieId}
        tmdbMediaType="movie"
      />
      {actionBarItems.map(({ icon, label, onClick }) => (
        <IconButton key={label} onClick={onClick} classes={classesIconButton}>
          {icon}
          <Typography color="inherit" variant="subtitle2">
            {label}
          </Typography>
        </IconButton>
      ))}
    </Box>
  );
};
