import { IconButton, IconButtonProps } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { useHistory } from "react-router";

export default (props: IconButtonProps) => {
  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  return (
    <IconButton onClick={onBack} edge="start" {...props}>
      <ArrowBackIosIcon />
    </IconButton>
  );
};
