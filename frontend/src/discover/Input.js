import { Box, Chip, makeStyles, Paper, Fab } from "@material-ui/core";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import discover from "./redux/discover";
import { Flipped, Flipper } from "react-flip-toolkit";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },

  chipOutlined: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,

    fontSize: "1.25em",
    fontWeight: "bold",
  },
  chipRoot: {
    marginLeft: theme.spacing(1),
    fontSize: "1.25em",
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fff",
  },
}));

const sortOptions = R.sortBy(R.prop("name"));

const optionsToFlipKey = R.pipe(R.pluck("id"), R.join(","));

const selectors = {
  options: (state) =>
    R.pipe(
      discover.selectors.options,
      //sortOptions,
      R.without(discover.selectors.inputOptions(state))
    )(state),
};

export default () => {
  const inputOptions = useSelector(discover.selectors.inputOptions);
  const options = useSelector(selectors.options);
  const dispatch = useDispatch();

  const handleInputOptionClick = (option) => () => {
    const newInput = {
      options: R.difference(inputOptions, [option]),
    };

    dispatch(discover.actions.setInput(newInput));
  };

  const handleOptionClick = (option) => () => {
    const newInput = {
      options: R.union([option], inputOptions),
    };
    dispatch(discover.actions.setInput(newInput));
  };

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 0;
    }
  }, [inputOptions.length]);

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Flipper flipKey={optionsToFlipKey(options)}>
        <HorizontalScroll ref={ref} paddingY={2}>
          {inputOptions.map((option) => (
            <Flipped flipId={option.id} key={option.id}>
              <Chip
                clickable
                onClick={handleInputOptionClick(option)}
                classes={{ root: classes.chipRoot }}
                label={discover.selectors.toLabel(option)}
              />
            </Flipped>
          ))}
          {options.map((option) => (
            <Flipped translate={false} flipId={option.id} key={option.id}>
              <Chip
                clickable
                onClick={handleOptionClick(option)}
                classes={{ outlined: classes.chipOutlined }}
                label={discover.selectors.toLabel(option)}
                variant="outlined"
              />
            </Flipped>
          ))}
        </HorizontalScroll>
      </Flipper>
    </Paper>
  );
};
