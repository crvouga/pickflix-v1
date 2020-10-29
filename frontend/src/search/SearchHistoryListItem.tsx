import {
  Box,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { ListItemProps } from "material-ui";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import { useMakeImageUrl } from "../tmdb/makeTMDbImageURL";
import { SearchResult } from "./query";
import useSearchHistory from "./useSearchHistory";
import HistoryIcon from "@material-ui/icons/History";
import DeleteIcon from "@material-ui/icons/Delete";

type Props = ListItemProps & {
  result: SearchResult;
};

const useStyles = makeStyles((theme) => ({
  historyIcon: {
    color: theme.palette.grey[500],
  },
  deleteIcon: {
    color: theme.palette.grey[500],
  },
}));

const DeleteButton = ({ result }: { result: SearchResult }) => {
  const classes = useStyles();
  const searchHistory = useSearchHistory();
  const handleDelete = (result: SearchResult) => {
    searchHistory.remove(result);
  };

  return (
    <IconButton onClick={() => handleDelete(result)}>
      <DeleteIcon className={classes.deleteIcon} />
    </IconButton>
  );
};

export default ({ result, ...ListItemProps }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const makeImageUrl = useMakeImageUrl();
  const searchHistory = useSearchHistory();

  const handleClick = (result: SearchResult) => () => {
    searchHistory.push(result);
    history.push(`/${result.mediaType}/${result.id}`);
  };

  switch (result.mediaType) {
    case "movie":
      return (
        <ListItem
          onClick={handleClick(result)}
          key={result.id}
          button
          {...ListItemProps}
        >
          <ListItemIcon>
            <HistoryIcon className={classes.historyIcon} />
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar variant="square" src={makeImageUrl(1, result)}>
              <MovieIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={result.title}
            secondary={moment(result.releaseDate).format("Y")}
          />
          <ListItemSecondaryAction>
            <DeleteButton result={result} />
          </ListItemSecondaryAction>
        </ListItem>
      );

    case "person":
      return (
        <ListItem
          onClick={handleClick(result)}
          key={result.id}
          button
          {...ListItemProps}
        >
          <ListItemIcon>
            <HistoryIcon className={classes.historyIcon} />
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar src={makeImageUrl(1, result)} />
          </ListItemAvatar>
          <ListItemText
            primary={result.name}
            secondary={result.knownForDepartment}
          />

          <ListItemSecondaryAction>
            <DeleteButton result={result} />
          </ListItemSecondaryAction>
        </ListItem>
      );

    case "tv":
      return null;
  }
};
