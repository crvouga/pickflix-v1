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
  const listItemCount = await this.unitOfWork.ListItems.count({
    listId: list.id,
  });

  const listItems = await this.getListItemAggergations({
    listId: list.id,
  });

  return {
    listItems,
    listItemCount,
    list,
  };
}
