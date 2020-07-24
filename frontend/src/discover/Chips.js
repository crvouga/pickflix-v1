import { Box, Chip, makeStyles, Paper } from "@material-ui/core";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import discover from "./redux/discover";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },
  chipRoot: {
    color: "#000",
    backgroundColor: "#fff",
  },
}));

export default () => {
  const ref = useRef();
  const classes = useStyles();
  const chips = useSelector(discover.selectors.chips);
  const options = useSelector(discover.selectors.options);
  const dispatch = useDispatch();

  const handleChipClick = (chip) => () => {
    dispatch(discover.actions.setChips(R.difference(chips, [chip])));
  };

  const handleOptionClick = (chip) => () => {
    dispatch(discover.actions.setChips(R.union([chip], chips)));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 0;
    }
  }, [chips.length]);

  const viewChips = R.sortBy(R.prop("name"), chips);
  const viewOptions = R.sortBy(R.prop("name"), R.without(chips, options));
  return (
    <Paper className={classes.root}>
      <HorizontalScroll ref={ref} paddingLeft={2} paddingY={2}>
        {viewChips.map((chip) => (
          <Box
            fontSize="1.25em"
            onClick={handleChipClick(chip)}
            marginRight={1}
            key={chip.id}
          >
            <Chip
              classes={{ root: classes.chipRoot }}
              style={{ fontSize: "inherit" }}
              label={discover.selectors.toLabel(chip)}
            />
          </Box>
        ))}
        {viewOptions.map((chip) => (
          <Box
            fontSize="1.25em"
            marginRight={1}
            key={chip.id}
            onClick={handleOptionClick(chip)}
          >
            <Chip
              style={{ fontSize: "inherit" }}
              label={discover.selectors.toLabel(chip)}
              variant="outlined"
            />
          </Box>
        ))}
      </HorizontalScroll>
    </Paper>
  );
};
