import {
  Chip,
  makeStyles,
  Paper,
  InputBase,
  Box,
  Collapse,
} from "@material-ui/core";
import * as R from "ramda";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import discover from "./redux";
import useBoolean from "../common/hooks/useBoolean";

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
  input: {
    flex: 1,
    width: "100%",
  },
  inputBase: {
    padding: 0,

    width: "auto",
    fontWeight: "bold",
    fontSize: "1.25em",
    flex: 1,
  },
}));

const sortOptions = R.sortBy(R.prop("name"));

const optionsToFlipKey = R.pipe(R.pluck("id"), R.join(","));

export default () => {
  const input = useSelector(discover.selectors.input);
  const options = useSelector(discover.selectors.optionWithoutInput);

  const dispatch = useDispatch();

  const handleInputChipClick = (type, chip) => () => {
    const newInput = R.mergeWith(R.difference, input, { [type]: [chip] });
    dispatch(discover.actions.setInput(newInput));
  };

  const handleOptionChipClick = (type, chip) => () => {
    const newInput = R.mergeWith(R.union, input, { [type]: [chip] });
    dispatch(discover.actions.setInput(newInput));
  };

  const handleTextChange = (e) => {
    dispatch(discover.actions.setText(e.target.value));
  };

  useEffect(() => {}, [R.length(R.unnest(R.values(input)))]);

  const isFocused = useBoolean();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.input}>
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
        <InputBase
          onChange={handleTextChange}
          className={classes.inputBase}
          placeholder="Genre, Person, Date, Keyword, Company "
          onFocus={isFocused.setTrue}
          onBlur={isFocused.setFalse}
        />
      </Box>
      <Collapse in={isFocused.value}>
        <Box display="flex" flexDirection="row" flexWrap="nowrap">
          {R.toPairs(options).map(([type, chips]) =>
            chips.map((chip) => (
              <Chip
                classes={{ outlined: classes.chipOutlined }}
                clickable
                onClick={handleOptionChipClick(type, chip)}
                key={chip.id}
                variant="outlined"
                label={chip.name}
              />
            ))
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};
