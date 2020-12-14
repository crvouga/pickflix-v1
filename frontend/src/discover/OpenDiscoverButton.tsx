import { IconButton, IconButtonProps } from "@material-ui/core";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import React from "react";
import { useHistory } from "react-router";
import { IDiscoverTag } from "./query/types";
import useDiscoverState from "./redux/useDiscoverState";

type Props = IconButtonProps & {
  tag: IDiscoverTag;
};

export default ({ tag, ...props }: Props) => {
  const history = useHistory();
  const discoverState = useDiscoverState();

  const handleClick = () => {
    history.push("/discover");
    discoverState.setActiveTagsById({
      [tag.id]: tag,
    });
  };

  return (
    <IconButton onClick={handleClick} {...props}>
      <ExploreOutlinedIcon />
    </IconButton>
  );
};
