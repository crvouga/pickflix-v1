import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import HistoryIcon from "@material-ui/icons/History";
import MovieIcon from "@material-ui/icons/Movie";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import makeImageUrl from "../../media/tmdb/makeImageUrl";
import AvatarUser from "../../user/components/AvatarUser";
import { makeUserPageRoute } from "../../user/UserPage";
import { SearchResult } from "../query";
import { useSearchState } from "../redux/search";

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
  const search = useSearchState();
  const handleDelete = (result: SearchResult) => {
    search.removeHistory(result);
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

  const search = useSearchState();

  const handleClick = (result: SearchResult) => () => {
    switch (result.type) {
      case "movie":
        history.push(`/movie/${result.id}`);
        break;
      case "person":
        history.push(`/person/${result.id}`);
        break;
      case "user":
        history.push(makeUserPageRoute({ userId: result.id }));
        break;
    }
    search.pushHistory(result);
  };

  switch (result.type) {
    case "movie":
      return (
        <ListItem
          //@ts-ignore
          onClick={handleClick(result)}
          key={result.id}
          //@ts-ignore
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
          //@ts-ignore
          onClick={handleClick(result)}
          key={result.id}
          //@ts-ignore
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
    case "user":
      return (
        <ListItem
          //@ts-ignore
          onClick={handleClick(result)}
          key={result.id}
          //@ts-ignore
          button
          {...ListItemProps}
        >
          <ListItemIcon>
            <HistoryIcon className={classes.historyIcon} />
          </ListItemIcon>
          <ListItemAvatar>
            <AvatarUser user={result} />
          </ListItemAvatar>
          <ListItemText
            primary={result.username}
            secondary={result.displayName || ""}
          />

          <ListItemSecondaryAction>
            <DeleteButton result={result} />
          </ListItemSecondaryAction>
        </ListItem>
      );
  }
  return null;
};
