import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

export default (props) => {
  const { goBack } = useHistory();

  return (
    <IconButton edge="start" onClick={goBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};
