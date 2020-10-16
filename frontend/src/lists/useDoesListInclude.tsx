import { useQuery } from "react-query";
import { TmdbMediaType } from "../tmdb/types";
import { getListsFromListItem, queryKeys } from "./query";

export default ({
  tmdbMediaType,
  tmdbMediaId,
}: {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
}) => {
  const query = useQuery(
    queryKeys.listsFromListItemMedia({ tmdbMediaType, tmdbMediaId }),
    () => getListsFromListItem({ tmdbMediaType, tmdbMediaId })
  );

  if (query.error || !query.data) {
    return (listId: string) => false;
  }

  const lists = query.data;

  return (listId: string) => {
    return Boolean(lists.find((list) => list.id === listId));
  };
};
