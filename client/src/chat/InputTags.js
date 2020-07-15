import { Avatar, Box, Chip, Collapse, Divider } from "@material-ui/core";
import * as R from "ramda";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import chat from "./redux/chat";
import RefsContext from "./RefsContext";
import typeToIcon from "./typeToIcon";

export default () => {
  const refs = useContext(RefsContext);
  const tags = useSelector(chat.selectors.tags);
  const dispatch = useDispatch();
  const handleTagDelete = (tag) => (e) => {
    refs.input.current.focus();
    const newTags = R.without([tag], tags);
    dispatch(chat.actions.setTags(newTags));
  };
  return (
    <Collapse in={tags.length !== 0}>
      <Box display="flex" flexDirection="row" flexWrap="wrap" maxWidth="100%">
        {tags.map((tag) => (
          <Box key={tag.id} margin={1}>
            <Chip
              clickable
              onDelete={handleTagDelete(tag)}
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
