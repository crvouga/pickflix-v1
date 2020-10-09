import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();

  const onBack = () => {
    history.push("/");
  };

  return (
    <IconButton edge="start" onClick={onBack}>
      <ArrowBackIosIcon />
    </IconButton>
  );
};
