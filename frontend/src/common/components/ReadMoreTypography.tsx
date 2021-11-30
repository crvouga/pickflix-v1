import { Box, Typography, TypographyProps } from "@material-ui/core";
import { dropLast } from "remeda";
import React, { useState } from "react";

//@ts-ignore
import trimText from "read-more-react/dist/utils/trimText";

export type ReadMoreProps = {
  ideal?: number;
  min?: number;
  max?: number;
  readMoreText?: string;
  readLessText?: string;
  children: string;
};

type Props = TypographyProps<"div"> & ReadMoreProps;

export default (props: Props) => {
  const {
    readMoreText = "Read More",
    readLessText = "Read Less",
    ...TypographyProps
  } = props;

  const text = props.children;

  const ideal = props.ideal || 150;
  const radius = Math.floor(ideal / 2);
  const min = props.min || ideal - radius;
  const max = props.max || ideal + radius;

  //@ts-ignore
  const [headText] = trimText(text, min, ideal, max);

  const [isIn, setIsIn] = useState(false);
  const headTextWithTrail = `${dropLast((headText as string).split(""), 1).join(
    ""
  )}...`;

  if (headText.length === text.length) {
    return <Typography {...TypographyProps}>{text}</Typography>;
  }

  return (
    <Typography component="div" {...TypographyProps}>
      {isIn ? text : headTextWithTrail}

      {!isIn && (
        <Box
          display="inline"
          fontWeight="bold"
          color="text.disabled"
          onClick={() => {
            setIsIn((isIn) => !isIn);
          }}
        >
          {" "}
          {isIn ? readLessText : readMoreText}
        </Box>
      )}
    </Typography>
  );
};
