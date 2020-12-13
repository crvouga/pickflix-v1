import { List } from "@material-ui/core";
import React from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import { IDiscoverMovieTag } from "../query/types";
import DiscoverMovieTagListItem from "./DiscoverMovieTagListItem";
import useSearchResults from "./useSearchResults";

type Props = {
  searchQuery: string;
  onClick: (tag: IDiscoverMovieTag) => void;
};

export default ({ searchQuery, onClick }: Props) => {
  const handleClick = (tag: IDiscoverMovieTag) => () => {
    onClick(tag);
  };

  const { tags, isLoading } = useSearchResults({ searchQuery });

  return (
    <List>
      {tags.map((tag) => (
        <DiscoverMovieTagListItem
          key={tag.id}
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
