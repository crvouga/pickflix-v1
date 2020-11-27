import { AutoList, List, ListItem } from "../../models";
import { ListAggergate, ListItemAggergate } from "../../models/types";
import { ListLogic } from "../logic";

export async function aggergateListItem(
  this: ListLogic,
  listItem: ListItem
): Promise<ListItemAggergate> {
  const tmdbData = await this.mediaLogic.requestTmdbData({
    mediaId: listItem.mediaId,
    query: {
      appendToResponse: "similar",
    },
  });

  return {
    listItem,
    tmdbData,
  };
}

export async function aggergateList<T extends List | AutoList>(
  this: ListLogic,
  list: T
): Promise<ListAggergate<T>> {
  const [listItemCount, listItems, [owner]] = await Promise.all([
    this.listItemRepository.count({
      listId: list.id,
    }),
    this.getListItemAggergations(
      {
        listId: list.id,
      },
      {
        page: 1,
        pageSize: 4,
      }
    ),
    this.userRepository.find({
      id: list.ownerId,
    }),
  ]);

  return {
    listItems,
    listItemCount,
    list,
    owner,
  };
}
