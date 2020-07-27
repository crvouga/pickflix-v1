import {
  Avatar,
  Box,
  Chip,
  makeStyles,
  Paper,
  Slide,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import HorizontalScroll from "../common/components/HorizontalScroll";
import Poster from "../movie/components/Poster";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import typeToIcon from "./typeToIcon";

const useStyles = makeStyles((theme) => ({
  bubble: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    maxWidth: "80%",
    borderRadius: "4em",
  },
  bubbleLeft: {
    borderBottomLeftRadius: 0,
  },
  bubbleRight: {
    borderBottomRightRadius: 0,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default ({ onTagClick, message }) => {
  const { author = undefined, text = "", tags = [], movies = [] } = message;
  const classes = useStyles({ movies });

  const handleTagClick = (tag) => (e) => {
    onTagClick(tag, e);
  };

  return (
    <Box>
      <Slide in direction={author === "user" ? "left" : "right"}>
        <Box
          display="flex"
          margin={1}
          flexDirection={author === "user" ? "row-reverse" : "row"}
        >
          <Paper
            className={clsx(classes.bubble, {
              [classes.bubbleRight]: author === "user",
              [classes.bubbleLeft]: author !== "user",
            })}
          >
            <Typography variant="body2">{text}</Typography>
            {tags.map((tag) => (
              <Chip
                onClick={handleTagClick(tag)}
                key={tag.id}
                avatar={
                  <Avatar src={makeTMDbImageURL(2, tag)}>
                    {typeToIcon(tag.type)}
                  </Avatar>
                }
                label={tag.name}
              />
            ))}
          </Paper>
        </Box>
      </Slide>

      {movies.length > 0 && (
        <HorizontalScroll>
          {movies.map((movie) => (
            <Poster key={movie.id} movie={movie} width="120px" />
          ))}
        </HorizontalScroll>
      )}
    </Box>
  );
};
