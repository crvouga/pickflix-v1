import { IconButton, IconButtonProps } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import React from "react";

export default ({
  checked,
  ...props
}: { checked?: boolean } & IconButtonProps) => {
  return (
    <IconButton {...props}>
      {checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
    </IconButton>
  );
};
