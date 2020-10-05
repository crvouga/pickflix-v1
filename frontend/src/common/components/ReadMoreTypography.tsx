import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";
import ReadMore, { ReadMoreProps } from "./ReadMore";

type Props = TypographyProps<"div"> & ReadMoreProps;

export default (props: Props) => {
  const {
    min,
    ideal,
    max,
    text,
    readMoreText = "Read More",
    readLessText = "Read Less",
    ...typographyProps
  } = props;

  const readMoreProps = {
    min,
    ideal,
    max,
    text,
    readMoreText,
    readLessText,
  };

  return (
    <Typography component="div" {...typographyProps}>
      <ReadMore {...readMoreProps} />
    </Typography>
  );
};
