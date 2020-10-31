import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import LabeledIconButton from "../../common/components/LabeledIconButton";
import useActions from "./useActions";

type Props = {
  tmdbMediaId: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default ({ tmdbMediaId }: Props) => {
  const classes = useStyles();
  const movieActions = useActions({
    tmdbMediaId: tmdbMediaId,
    tmdbMediaType: "movie",
  });

  const actionBarItems = [
    movieActions.like,
    // movieActions.favorite,
    movieActions.watchNext,
    movieActions.addListItem,
  ];

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
      {actionBarItems.map(({ icon, label, onClick }) => (
        <LabeledIconButton
          className={classes.button}
          key={label}
          icon={icon}
          label={label}
          onClick={onClick}
        />
      ))}
    </Box>
  );
};
