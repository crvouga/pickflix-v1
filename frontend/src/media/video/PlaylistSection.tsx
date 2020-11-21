import {
  Collapse,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ExpandIcon from "../../common/components/ExpandIcon";
import useBoolean from "../../common/hooks/useBoolean";

import { video } from "./redux/video";
import { renderText } from "./utils";

export default () => {
  const playlist = useSelector(video.selectors.playlist);
  const expanded = useBoolean(false);

  return (
    <List>
      <ListItem button onClick={expanded.toggle}>
        <ListItemText primary={renderText(playlist)} />
        <ListItemSecondaryAction>
          <ExpandIcon expanded={expanded.value} />
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={expanded.value}></Collapse>
    </List>
  );
};
