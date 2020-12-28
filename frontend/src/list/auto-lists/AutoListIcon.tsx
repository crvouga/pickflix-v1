import { SvgIconProps } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import React from "react";
import { AutoListKeys } from "../query";

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

    case AutoListKeys.Favorite:
      return filled ? (
        <FavoriteIcon {...iconProps} />
      ) : (
        <FavoriteBorderIcon {...iconProps} />
      );
  }
};
