import { Avatar, Box, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { push } from "connected-react-router";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { useDispatch } from "react-redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";

const useStyles = makeStyles((theme) => ({
  avatar: {
    border: `solid ${theme.palette.grey[800]} 1px`,
    width: "100%",
    height: "100%",
  },
}));

export default ({ person, skeleton, ...restOfProps }) => {
  const { profilePath } = person;
  const classes = useStyles();
  const profileURL = makeTMDbImageURL(2, { profilePath });
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(push(`/person/${person.id}`));
  };

  return (
    <Box onClick={handleClick} {...restOfProps}>
      <AspectRatio ratio="1/1">
        {!skeleton && <Avatar className={classes.avatar} src={profileURL} />}

        {skeleton && (
          <Skeleton
            variant="circle"
            animation="wave"
            width="100%"
            height="100%"
          />
        )}
      </AspectRatio>
    </Box>
  );
};
