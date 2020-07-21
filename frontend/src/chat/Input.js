import { Box, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import BlurBackdrop from "../common/components/BlurBackdrop";
import InputField from "./InputField";
import InputOptions from "./InputOptions";
import InputTags from "./InputTags";
import RefsContext from "./RefsContext";

const r = 18;

const useStyles = makeStyles((theme) => ({
  border: {
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: r,
  },
  borderRadiusTop: {
    borderTopRightRadius: r,
    borderTopLeftRadius: r,
  },
}));

export default () => {
  const classes = useStyles();
  const refs = useContext(RefsContext);

  const focus = (e) => {
    refs.input.current.focus();
  };

  return (
    <div onClick={focus}>
      <Box position="relative">
        <BlurBackdrop className={classes.borderRadiusTop} />
        <div className={classes.border}>
          <InputTags />
          <InputField />
        </div>
        <InputOptions />
      </Box>
    </div>
  );
};
