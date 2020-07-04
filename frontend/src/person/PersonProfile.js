import { ButtonBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import PersonAvatar from "./PersonAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

export default ({ person }) => {
  const { id, profilePath, name } = person;
  const classes = useStyles();
  const history = useHistory();
  const onClick = () => {
    history.push(`/person/${id}`);
  };
  return (
    <ButtonBase component="div" className={classes.root} onClick={onClick}>
      <PersonAvatar person={person} />
      <Typography className={classes.name} align="center">
        {name}
      </Typography>
    </ButtonBase>
  );
};
