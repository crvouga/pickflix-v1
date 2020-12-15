import { List } from "@material-ui/core";
import React from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import { CompanyResult, KeywordResult, PersonResult } from "../../search/query";
import { IDiscoverTag, TagType } from "../query/types";
import useDiscoverState from "../redux/useDiscoverState";
import DiscoverTagListItem from "./DiscoverTagListItem";
import { DiscoverTagsSearchFilter, useQuerySearchDiscoverTags } from "./query";

type Props = {
  searchQuery: string;
  searchFilter?: DiscoverTagsSearchFilter;
  onClick: (tag: IDiscoverTag) => void;
};

const resultToTag = (
  result: PersonResult | CompanyResult | KeywordResult
): IDiscoverTag => {
  switch (result.type) {
    case "company":
      return {
        ...result,
        type: TagType.withCompanies,
      };

    case "person":
      return {
        ...result,
        type: TagType.withPeople,
      };

    case "keyword":
      return {
        ...result,
        type: TagType.withKeywords,
      };
  }
};

const searchFilterToTagType = (searchFilter: DiscoverTagsSearchFilter) => {
  switch (searchFilter) {
    case DiscoverTagsSearchFilter.Company:
      return TagType.withCompanies;
    case DiscoverTagsSearchFilter.Person:
      return TagType.withPeople;
    case DiscoverTagsSearchFilter.Keyword:
      return TagType.withKeywords;
  }
};

export default ({ searchQuery, searchFilter, onClick }: Props) => {
  const discoverState = useDiscoverState();

  const query = useQuerySearchDiscoverTags({
    text: searchQuery,
    filter: searchFilter,
  });

  if (searchQuery.trim().length === 0) {
    return (
      <List>
        {discoverState.nonActiveTags
          .filter(
            (tag) =>
              !searchFilter || searchFilterToTagType(searchFilter) === tag.type
          )
          .map((tag) => (
            <DiscoverTagListItem
              key={tag.id}
              button
              onClick={() => {
                onClick(tag);
              }}
              tag={tag}
            />
          ))}
      </List>
    );
  }

  if (!query.data) {
    return (
      <List>
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </List>
    );
  }

  const tags = query.data.flatMap((page) => page.results.map(resultToTag));

  return (
    <List>
      {tags.map((tag) => (
        <DiscoverTagListItem
          key={tag.id}
          button
          onClick={() => {
            onClick(tag);
          }}
          tag={tag}
        />
      ))}
    </List>
  );
};
