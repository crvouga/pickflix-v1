import { Chip, makeStyles, Paper } from "@material-ui/core";
import * as R from "ramda";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import discover from "./redux/discover";

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

export default () => {
  const input = useSelector(discover.selectors.input);
  const options = useSelector(discover.selectors.optionWithoutInput);
  const dispatch = useDispatch();

  const handleInputChipClick = (type, chip) => () => {
    const newInput = {
      ...input,
      [type]: R.difference(input[type] || [], [chip]),
    };

    dispatch(discover.actions.setInput(newInput));
  };

  const handleOptionChipClick = (type, chip) => () => {
    const newInput = {
      ...input,
      [type]: R.union(input[type], [chip]),
    };

    dispatch(discover.actions.setInput(newInput));
  };

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollLeft = 0;
  }, [R.length(R.unnest(R.values(input)))]);

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <HorizontalScroll ref={ref} paddingY={2}>
        {R.toPairs(input).map(([type, chips]) =>
          chips.map((chip) => (
            <Chip
              key={chip.id}
              clickable
              onClick={handleInputChipClick(type, chip)}
              classes={{ root: classes.chipRoot }}
              label={chip.name}
            />
          ))
        )}

        {R.toPairs(options).map(([type, chips]) =>
          chips.map((chip) => (
            <Chip
              key={chip.id}
              clickable
              onClick={handleOptionChipClick(type, chip)}
              variant="outlined"
              classes={{ outlined: classes.chipOutlined }}
              label={chip.name}
            />
          ))
        )}
      </HorizontalScroll>
    </Paper>
  );
};
