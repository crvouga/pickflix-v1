import { Box, ButtonBase, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import router from "../redux/router";
import PersonAvatar from "../person/PersonAvatar";
import search from "./redux";

export default ({ person }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(search.actions.chose(person));
    dispatch(router.actions.push(`/person/${person.id}`));
  };
  return (
    <Box width="100%" display="flex" flexDirection="row" onClick={handleClick}>
      <PersonAvatar person={person} width="20%" />
      <Typography>{person.name}</Typography>
    </Box>
  );
};
