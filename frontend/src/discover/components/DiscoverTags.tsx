import { Box, ChipProps, BoxProps } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { IDiscoverTag } from "../query/types";
import DiscoverTag from "./DiscoverTag";
import HorizontalSnapScroll from "../../common/components/HorizontalSnapScroll";

export const DiscoverTags = ({
  tags,
  onClick,
  ChipProps,
  BoxProps = {
    paddingX: 2,
    paddingBottom: 1,
    marginBottom: 1,
  },
}: {
  tags: IDiscoverTag[];
  onClick?: (tag: IDiscoverTag) => void;
  ChipProps?: ChipProps;
  BoxProps?: BoxProps;
}) => {
  return (
    <HorizontalSnapScroll {...BoxProps}>
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
    </HorizontalSnapScroll>
  );
};
