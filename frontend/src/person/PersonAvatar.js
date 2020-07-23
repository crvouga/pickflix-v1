import { Avatar, Box, makeStyles } from "@material-ui/core";
import { push } from "connected-react-router";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { useDispatch } from "react-redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";

const useStyles = makeStyles({
  avatar: {
    width: "100%",
    height: "100%",
  },
});

export default ({ person, ...props }) => {
  const { profilePath } = person;
  const classes = useStyles();
  const profileURL = makeTMDbImageURL(2, { profilePath });
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(push(`/person/${person.id}`));
  };
  return (
    <Box onClick={handleClick} {...props}>
      <AspectRatio ratio="1/1">
        <Avatar className={classes.avatar} src={profileURL} />
      </AspectRatio>
    </Box>
  );
};
