import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import BlurBackdrop from "../common/components/BlurBackdrop";
import InputField from "./InputField";
import InputOptions from "./InputOptions";
import InputTags from "./InputTags";

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

  return (
    <Box position="fixed" top="auto" bottom="0" width="100vw">
      <Box position="relative">
        <BlurBackdrop className={classes.borderRadiusTop} />
        <div className={classes.border}>
          <InputTags />
          <InputField />
        </div>
        <InputOptions />
      </Box>
    </Box>
  );
};
