import { Box, BoxProps } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { DiscoverMovieTag as IDiscoverMovieTag } from "../../discover/query/types";
import DiscoverMovieTag from "../../discover/DiscoverMovieTag";

type Props = Omit<BoxProps, "onClick"> & {
  tags: IDiscoverMovieTag[];
  onClick: (tag: IDiscoverMovieTag) => void;
};

export default ({ tags, onClick, ...props }: Props) => {
  const handleClick = (tag: IDiscoverMovieTag) => () => onClick(tag);

  return (
    <HorizontalScroll paddingLeft={2} paddingBottom={1} {...props}>
      {tags.map((tag) => (
        <Box key={tag.id} p={1 / 2} onClick={handleClick(tag)}>
          <DiscoverMovieTag tag={tag} />
        </Box>
      ))}
    </HorizontalScroll>
  );
};
