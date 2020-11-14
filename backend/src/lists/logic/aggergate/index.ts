import { AutoList, List, ListItem } from "../../models";
import { ListAggergate, ListItemAggergate } from "../../models/types";
import { ListLogic } from "../build";

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
  const { ListItems, Users } = this.unitOfWork;

  const [listItemCount, listItems, [owner]] = await Promise.all([
    ListItems.count({
      listId: list.id,
    }),
    this.getListItemAggergations({
      listId: list.id,
    }),
    Users.find({
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
