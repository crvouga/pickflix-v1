import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux";

export default () => {
  const dispatch = useDispatch();

  const onBack = () => {
    dispatch(actions.router.goBack());
  };

  return (
    <IconButton edge="start" onClick={onBack}>
      <ArrowBackIosIcon />
    </IconButton>
  );
};
