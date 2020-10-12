import { Box, Chip, BoxProps } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { Tag as ITag } from "../../discover/redux/types";

type Props = Omit<BoxProps, "onClick"> & {
  tags: ITag[];
  onClick: (tag: ITag) => void;
};

export default ({ tags, onClick, ...props }: Props) => {
  const handleClick = (tag: ITag) => () => onClick(tag);

  return (
    <HorizontalScroll paddingLeft={2} paddingBottom={1} {...props}>
      {tags.map((tag) => (
        <Box key={tag.id} p={1 / 2}>
          <Chip
            variant="outlined"
            clickable
            label={tag.name}
            onClick={handleClick(tag)}
          />
        </Box>
      ))}
    </HorizontalScroll>
  );
};