import {
  Avatar,
  Box,
  Chip,
  Collapse,
  Divider,
  makeStyles,
} from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";
import typeToIcon from "./typeToIcon";

const useStyles = makeStyles((theme) => ({
  deleteIcon: {
    pointerEvents: "none",
  },
}));

export default () => {
  const classes = useStyles();
  const tags = useSelector(chat.selectors.tags);
  const dispatch = useDispatch();

  const handleClick = (tag) => (e) => {
    const newTags = R.without([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };

  const handleDelete = () => {};

  return (
    <Collapse in={tags.length !== 0}>
      <Box display="flex" flexDirection="row" flexWrap="wrap" maxWidth="100%">
        {tags.map((tag) => (
          <Box key={tag.id} margin={1}>
            <Chip
              classes={{ deleteIcon: classes.deleteIcon }}
              clickable
              onClick={handleClick(tag)}
              onDelete={handleDelete}
              label={tag.name}
              avatar={
                <Avatar src={makeTMDbImageURL(2, tag)}>
                  {typeToIcon(tag.type)}
                </Avatar>
              }
            />
          </Box>
        ))}
      </Box>
      <Divider />
    </Collapse>
  );
};
