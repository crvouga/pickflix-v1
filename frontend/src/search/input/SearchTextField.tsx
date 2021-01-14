import {
  IconButton,
  InputBase,
  InputBaseProps,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const useStyles = makeStyles((theme) => ({
  startAdornment: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  input: {
    paddingLeft: theme.spacing(1),
    maxWidth: "100%",
    fontSize: "1.25em",
    fontWeight: "bold",
  },
}));

type Props = InputBaseProps & {
  onClear?: () => void;
};

// prevent lag while typing
const shouldNotComponentUpdate = (_1: Props, _2: Props) => true;

export default React.memo(
  React.forwardRef(({ onClear, ...props }: Props, inputRef) => {
    const classes = useStyles();

    return (
      <InputBase
        fullWidth
        autoFocus
        inputRef={inputRef}
        placeholder="Search"
        className={classes.input}
        // startAdornment={<SearchIcon className={classes.startAdornment} />}
        endAdornment={
          <IconButton
            onClick={() => {
              if (onClear) {
                onClear();
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        }
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...props}
      />
    );
  }),
  shouldNotComponentUpdate
);
