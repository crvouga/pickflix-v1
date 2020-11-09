import { SvgIconProps, useTheme } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import React from "react";
import { AutoListKeys } from "../query/types";

type Props = SvgIconProps & {
  autoListKey: AutoListKeys;
  filled?: boolean;
  className?: string;
};

export default ({
  autoListKey,
  filled = false,
  className,
  ...props
}: Props) => {
  const iconProps = {
    ...props,
    className,
  };

  switch (autoListKey) {
    case AutoListKeys.WatchNext:
      return filled ? (
        <BookmarkIcon {...iconProps} />
      ) : (
        <BookmarkBorderIcon {...iconProps} />
      );
    case AutoListKeys.Liked:
      return filled ? (
        <ThumbUpAltIcon {...iconProps} />
      ) : (
        <ThumbUpOutlinedIcon {...iconProps} />
      );
  }
};
