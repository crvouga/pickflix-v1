import { makeStyles, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import React, { useRef, useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  startAdornment: {
    marginRight: theme.spacing(2),
  },
  input: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
}));

type Props = {
  onChange: (searchQuery: string) => void;
};

export default ({ onChange }: Props) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();
  const [disabled, setDisabled] = useState(true);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
      setDisabled(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    onChange(e.target.value);
    setDisabled(e.target.value.length === 0);
  };

  useEffect(() => {
    handleClear();
  }, []);

  return (
    <TextField
      variant="outlined"
      fullWidth
      autoFocus
      inputRef={inputRef}
      placeholder={"Search Pickflix"}
      onChange={handleChange}
      InputProps={{
        className: classes.input,
        startAdornment: <SearchIcon className={classes.startAdornment} />,
        endAdornment: (
          <IconButton
            disabled={disabled}
            onClick={() => {
              handleClear();
            }}
          >
            <CloseIcon />
          </IconButton>
        ),
      }}
    />
  );
};
