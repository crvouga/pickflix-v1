import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";

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

  const actionBarItems = [
    movieActions.like,
    movieActions.watchNext,
    movieActions.addListItem,
  ];

  return (
    <Box display="flex" justifyContent="space-around" flexWrap="nowrap">
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
