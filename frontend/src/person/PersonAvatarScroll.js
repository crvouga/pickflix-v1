import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Profile from "./PersonProfile";

const useStyles = makeStyles((theme) => ({
  scroll: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
}));

const ProfileScroll = ({ title, people }) => {
  const classes = useStyles();
  return (
    <div>
      {title && <Typography variant="h6">{title}</Typography>}
      {people && (
        <div className={classes.scroll}>
          {people.map((person) => (
            <Profile key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileScroll;
