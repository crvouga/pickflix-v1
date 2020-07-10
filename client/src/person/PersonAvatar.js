import { Avatar, makeStyles, Box } from "@material-ui/core";
import React from "react";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { useHistory } from "react-router";
import AspectRatio from "../common/AspectRatio";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "100%",
    height: "100%",
  },
}));

export default ({ person, ...props }) => {
  const { profilePath } = person;
  const classes = useStyles();
  const profileURL = makeTMDbImageURL(2, { profilePath });
  const history = useHistory();
  const handleClick = () => {
    history.push(`/person/${person.id}`);
  };
  return (
    <AspectRatio ratio={[1, 1]} onClick={handleClick} {...props}>
      <Avatar className={classes.avatar} src={profileURL} />
    </AspectRatio>
  );
};
