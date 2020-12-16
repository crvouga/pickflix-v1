import { Box, ChipProps } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { IDiscoverTag } from "../query/types";
import DiscoverTag from "./DiscoverTag";

export const DiscoverTags = ({
  tags,
  onClick,
  ChipProps,
}: {
  tags: IDiscoverTag[];
  onClick?: (tag: IDiscoverTag) => void;
  ChipProps?: ChipProps;
}) => {
  return (
    <HorizontalScroll paddingX={2} p={1} marginBottom={1}>
      {tags.map((tag) => (
        <Box
          key={tag.id}
          m={1 / 2}
          onClick={() => {
            if (onClick) {
              onClick(tag);
            }
          }}
        >
          <DiscoverTag clickable variant="outlined" tag={tag} {...ChipProps} />
        </Box>
      ))}
    </HorizontalScroll>
  );
};
