import { List } from "@material-ui/core";
import React from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import { IDiscoverTag } from "../query/types";
import DiscoverMovieTagListItem from "./DiscoverMovieTagListItem";
import useSearchResults from "./useSearchResults";

type Props = {
  searchQuery: string;
  onClick: (tag: IDiscoverTag) => void;
};

export default ({ searchQuery, onClick }: Props) => {
  const handleClick = (tag: IDiscoverTag) => () => {
    onClick(tag);
  };

  const { tags, isLoading } = useSearchResults({ searchQuery });

  return (
    <List>
      {tags.map((tag) => (
        <DiscoverMovieTagListItem
          key={tag.id}
          button={true}
          onClick={handleClick(tag)}
          tag={tag}
        />
      ))}
      {isLoading && (
        <React.Fragment>
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
        </React.Fragment>
      )}
    </List>
  );
};
