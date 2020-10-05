import { Box, Collapse, TypographyProps, Typography } from "@material-ui/core";
import { dropLast } from "ramda";
import React from "react";
import trimText from "read-more-react/dist/utils/trimText";
import useBoolean from "../hooks/useBoolean";
import Markdown from "./Markdown";
import MarkdownTypography from "./MarkdownTypography";

export type ReadMoreProps = TypographyProps<"div"> & {
  min?: number;
  ideal?: number;
  max?: number;
  text: string;
  readMoreText?: string;
  readLessText?: string;
};

export default (props: ReadMoreProps) => {
  const {
    min,
    ideal,
    max,
    text,
    readMoreText = "Read More",
    readLessText = "Read Less",

    ...typographyProps
  } = props;

  const isIn = useBoolean(false);

  const [headText, tailText] = trimText(text, min, ideal, max);

  if (tailText.length === 0) {
    return <Typography {...typographyProps}>{headText}</Typography>;
  }

  const headTextWithTrail = `${dropLast(1, headText)}... `;

  return (
    <MarkdownTypography onClick={isIn.toggle} {...typographyProps}>
      {!isIn.value && (
        <React.Fragment>
          {headTextWithTrail}

          <Box component="span" fontWeight="bold" color="text.secondary">
            {readMoreText}
          </Box>
        </React.Fragment>
      )}
      {isIn.value && headText}
      <Collapse in={isIn.value}>{tailText}</Collapse>
    </MarkdownTypography>
  );
};
