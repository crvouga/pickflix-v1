import { Box, Collapse, Typography, TypographyProps } from "@material-ui/core";
import { dropLast } from "ramda";
import React from "react";
import trimText from "read-more-react/dist/utils/trimText";
import useBoolean from "../hooks/useBoolean";

export type ReadMoreProps = {
  min?: number;
  ideal?: number;
  max?: number;
  text: string;
  readMoreText?: string;
  readLessText?: string;
};

type Props = ReadMoreProps & {
  TypographyProps?: TypographyProps<"div">;
};

export default (props: Props) => {
  const {
    min,
    ideal,
    max,
    text,
    readMoreText = "Read More",
    TypographyProps,
  } = props;

  const isIn = useBoolean(false);

  const [headText, tailText] = trimText(text, min, ideal, max);

  if (tailText.length === 0) {
    return (
      <Typography component="div" {...TypographyProps}>
        {headText}
      </Typography>
    );
  }

  const headTextWithTrail = `${dropLast(1, headText)}... `;

  return (
    <Typography
      component="div"
      style={{ wordBreak: "break-word" }}
      onClick={isIn.toggle}
      {...TypographyProps}
    >
      {!isIn.value && (
        <React.Fragment>
          {headTextWithTrail}
          <Box display="inline" fontWeight="bold" color="text.secondary">
            {readMoreText}
          </Box>
        </React.Fragment>
      )}

      {isIn.value && headText}
      <Collapse in={isIn.value}>{tailText}</Collapse>
    </Typography>
  );
};
