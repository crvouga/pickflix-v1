import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import LabeledIconButton from "../../common/components/LabeledIconButton";
import AutoListToggleListItemButton from "../../lists/auto-lists/AutoListToggleListItemButton";
import { AutoListKeys } from "../../lists/query";
import useActions from "./useActions";
import { MediaId, TmdbMediaType } from "../../tmdb/types";

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
    tmdbMediaType: TmdbMediaType.movie,
  });

  const actionBarItems = [movieActions.addListItem];

  const mediaId = {
    tmdbMediaId: Number(tmdbMediaId),
    tmdbMediaType: TmdbMediaType.movie,
  };

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
      <AutoListToggleListItemButton
        autoListKey={AutoListKeys.Liked}
        mediaId={mediaId}
      />
      <AutoListToggleListItemButton
        autoListKey={AutoListKeys.WatchNext}
        mediaId={mediaId}
      />

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
