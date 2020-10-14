import {
  AppBar,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React, { useRef } from "react";
import BackButton from "../navigation/BackButton";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.toolbar,
  input: {
    fontSize: "1.25em",
    fontWeight: "bold",
    flex: 1,
  },
}));

type Props = {
  onChange: (searchQuery: string) => void;
};

export default ({ onChange }: Props) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = "";
    }
    onChange("");
  };

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    onChange(e.target.value);
  };

  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <BackButton />
        <InputBase
          autoFocus
          inputRef={inputRef}
          className={classes.input}
          placeholder="Search Movie or Person"
          onChange={handleChange}
          //
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
        />
        <IconButton edge="end" onClick={handleClear}>
          <ClearIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
