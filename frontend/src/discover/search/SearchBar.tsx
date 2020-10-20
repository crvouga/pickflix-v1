import {
  AppBar,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React, { ChangeEvent, useRef } from "react";
import BackButton from "../../navigation/BackButton";

type Props = {
  onChange: (value: string) => void;
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    postion: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  },
  toolbar: theme.mixins.toolbar,
  input: {
    flex: 1,
    fontWeight: "bold",
    fontSize: "1.25em",
  },
}));

export default ({ onChange }: Props) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement | undefined>();

  const handleChange = (e: ChangeEvent<{ value: string }>) => {
    const value = e.target.value;
    onChange(value);
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <BackButton />
          <InputBase
            autoFocus
            inputRef={inputRef}
            placeholder="Person, Keyword, Company"
            onChange={handleChange}
            className={classes.input}
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
      {/* <div className={classes.toolbar} /> */}
    </React.Fragment>
  );
};
