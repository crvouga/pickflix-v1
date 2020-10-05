import { Box, Collapse } from "@material-ui/core";
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

export default (props: ReadMoreProps) => {
  const {
    min,
    ideal,
    max,
    text,
    readMoreText = "Read More",
    readLessText = "Read Less",
  } = props;

  const isIn = useBoolean(false);

  const [headText, tailText] = trimText(text, min, ideal, max);

  if (tailText.length === 0) {
    return <div>{headText}</div>;
  }

  const headTextWithTrail = `${dropLast(1, headText)}... `;

  return (
    <div onClick={isIn.toggle}>
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
    </div>
  );
};
