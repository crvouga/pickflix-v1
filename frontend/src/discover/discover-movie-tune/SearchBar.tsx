import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React, { ChangeEvent, useRef, useEffect } from "react";
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
      <AppBar color="default" className={classes.appBar}>
        <Toolbar>
          <BackButton />
          <InputBase
            autoFocus
            inputRef={inputRef}
            placeholder="Search Person, Keyword, Company"
            onChange={handleChange}
            style={{ flex: 1 }}
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
      <div className={classes.toolbar} />
    </React.Fragment>
  );
};