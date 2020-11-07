import { AutoList, List, ListItem } from "../../models/types";
import { ListLogic } from "../build";

export async function aggergateListItem(this: ListLogic, listItem: ListItem) {
  const tmdbData = await this.mediaLogic.requestTmdbData({
    path: `/${listItem.tmdbMediaType}/${listItem.tmdbMediaId}`,
  });

  return {
    listItem,
    tmdbData,
  };
}

export async function aggergateList<T extends List | AutoList>(
  this: ListLogic,
  list: T
) {
  const { ListItems, Users } = this.unitOfWork;

  const [listItemCount, listItems, [owner]] = await Promise.all([
    ListItems.count({
      listId: list.id,
    }),
    this.getListItemAggergations({
      listId: list.id,
    }),
    Users.find({ id: list.ownerId }),
  ]);

  return {
    listItems,
    listItemCount,
    list,
    owner,
  };
}
