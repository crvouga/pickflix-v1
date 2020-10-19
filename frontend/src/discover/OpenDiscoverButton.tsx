import { IconButton, IconButtonProps } from "@material-ui/core";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import React from "react";
import { useHistory } from "react-router";
import { DiscoverMovieTag } from "./query/types";
import useDiscoverLogic from "./useDiscoverLogic";

type Props = IconButtonProps & {
  tag: DiscoverMovieTag;
};

export default ({ tag, ...props }: Props) => {
  const history = useHistory();
  const discoverLogic = useDiscoverLogic();

  const handleClick = () => {
    discoverLogic.clear();
    discoverLogic.activateTag(tag);
    history.push("/discover");
  };

  return (
    <IconButton onClick={handleClick} {...props}>
      <ExploreOutlinedIcon />
    </IconButton>
  );
};
