import { Chip, ChipProps, makeStyles } from "@material-ui/core";
import React from "react";

export const useStylesChip = makeStyles((theme) => ({
  root: {
    fontSize: "1.25em",
    fontWeight: "bold",
  },
}));

export default (props: ChipProps) => {
  const classesChip = useStylesChip();

  return <Chip classes={classesChip} {...props} />;
};
