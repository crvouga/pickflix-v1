import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import React from "react";
import { AutoListKey } from "../types";
import { SvgIconProps } from "material-ui";

type Props = SvgIconProps & {
  autoListKey: AutoListKey;
  filled?: boolean;
  className?: string;
};

export default ({ autoListKey, filled = false, className }: Props) => {
  const iconProps = {
    className,
  };
  switch (autoListKey) {
    case "watch-next":
      return filled ? (
        <BookmarkIcon {...iconProps} />
      ) : (
        <BookmarkBorderIcon {...iconProps} />
      );
    case "liked":
      return filled ? (
        <ThumbUpAltIcon {...iconProps} />
      ) : (
        <ThumbUpOutlinedIcon {...iconProps} />
      );
  }
};
