import {
  Avatar,
  Box,
  Chip,
  makeStyles,
  Paper,
  Slide,
  Typography,
  Fade,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import PosterScroll from "../movie/components/PosterScroll";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import typeToIcon from "./typeToIcon";

const useStyles = makeStyles((theme) => ({
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

  return (
    <Box>
      <Slide in direction={author === "user" ? "left" : "right"}>
        <Box
          display="flex"
          margin={1}
          flexDirection={author === "user" ? "row-reverse" : "row"}
        >
          <Box
            component={Paper}
            paddingX={2}
            paddingY={1}
            maxWidth="80%"
            borderRadius="4em"
            className={clsx({
              [classes.bubbleRight]: author === "user",
              [classes.bubbleLeft]: author !== "user",
            })}
          >
            <Typography variant="body2">{text}</Typography>
            {tags.map((tag) => (
              <Chip
                onClick={() => onTagClick(tag)}
                key={tag.id}
                avatar={
                  <Avatar src={makeTMDbImageURL(2, tag)}>
                    {typeToIcon(tag.type)}
                  </Avatar>
                }
                label={tag.name}
              />
            ))}
          </Box>
        </Box>
      </Slide>
      <Fade in={movies.length > 0}>
        <PosterScroll
          BoxProps={{ marginBottom: 4 }}
          movies={movies}
          PosterProps={{ minWidth: 120, maxWidth: 120, marginRight: 1 }}
        />
      </Fade>
    </Box>
  );
};
