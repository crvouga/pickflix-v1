import {
  Chip,
  makeStyles,
  Paper,
  InputBase,
  Box,
  Collapse,
  Popover,
  Typography,
} from "@material-ui/core";
import * as R from "ramda";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../common/components/HorizontalScroll";
import discover from "./redux";
import useBoolean from "../common/hooks/useBoolean";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: theme.zIndex.appBar,
    padding: theme.spacing(2),
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
    display: "flex",
    flexDirection: "row",
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const paperRef = useRef();
  const inputRef = useRef();

  const handleFocus = (e) => {};

  const handleBlur = (e) => {};

  return (
    <Paper className={classes.paper} ref={paperRef}>
      <Box className={classes.input}>
        {/* <span
          onClick={handleClick}
          style={{ fontWeight: "bold", fontSize: "1.2em", padding: 12 }}
          contentEditable
          onChange={(e) => {
            console.log("change", e);
          }}
        >
          hello
        </span> */}
        <Box>
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
        </Box>
        <Box flex={1}>
          <InputBase
            onClick={handleClick}
            inputRef={inputRef}
            onChange={handleTextChange}
            className={classes.inputBase}
            placeholder="Genre, Person, Date, Keyword, Company "
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{ style: { height: 200 } }}
      >
        <Box display="flex" flexDirection="row" maxWidth="100%">
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
      </Popover>
    </Paper>
  );
};
