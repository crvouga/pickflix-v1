import * as R from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatFab from "../chat/Fab";
import Chips from "./Chips";
import discover from "./redux/discover";
import Results from "./Results";

export default () => {
  const chips = useSelector(discover.selectors.chips);
  const options = useSelector(discover.selectors.options);
  const dispatch = useDispatch();

  const handleChipClick = (chip) => () => {};

  const handleOptionClick = (chip) => () => {
    dispatch(discover.actions.setChips(R.union([chip], chips)));
  };

  return (
    <div>
      <ChatFab />
      <Chips />
      <Results />
    </div>
  );
};
