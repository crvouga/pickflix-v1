import {
  Collapse,
  ListItemSecondaryAction,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../redux";
import PlaylistListItem from "./PlaylistListItem";
import ExpandIcon from "../common/components/ExpandIcon";
import useBoolean from "../common/hooks/useBoolean";
import { renderText } from "./utils";

export default () => {
  const videos = useSelector(selectors.video.playlist);
  const expanded = useBoolean(false);

  return (
    <List>
      <ListItem button onClick={expanded.toggle}>
        <ListItemText primary={renderText(videos)} />
        <ListItemSecondaryAction>
          <ExpandIcon expanded={expanded.value} />
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={expanded.value}>
        {videos.map((video) => (
          <PlaylistListItem key={video.key} video={video} />
        ))}
      </Collapse>
    </List>
  );
};
