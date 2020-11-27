import { PaginationOptions } from "../../../app/data-access/types";
import { removeNullOrUndefinedEntries } from "../../../app/utils";
import {
  MediaId,
  TmdbMediaId,
  TmdbMediaType,
} from "../../../media/models/types";
import { UserId } from "../../../users/models";
import { ListId, ListItem, makeListItem, updateList } from "../../models";
import { ListItemId, PartialListItem } from "../../models/make-list-item";
import { ListLogic } from "../logic";

export async function removeListItems(
  this: ListLogic,
  listItemInfos: (
    | {
        id: ListItemId;
      }
    | {
        listId: ListId;
        mediaId: MediaId;
      }
  )[]
) {
  await this.listItemRepository.remove(listItemInfos);
}

export async function getListItemAggergations(
  this: ListLogic,
  listItemInfo: {
    userId?: UserId;
    listId?: ListId;
    mediaId?: MediaId;
  },
  paginationOptions?: PaginationOptions
) {
  const listItems = await this.listItemRepository.find(
    removeNullOrUndefinedEntries(listItemInfo),
    {
      orderBy: [["createdAt", "descend"]],
      pagination: paginationOptions,
    }
  );

  const aggergatedListItems = await Promise.all(
    listItems.map((listItem) => this.aggergateListItem(listItem))
  );

  return aggergatedListItems;
}

export async function getListItem(
  this: ListLogic,
  listItemInfo: {
    listId: ListId;
    tmdbMediaId: TmdbMediaId;
    tmdbMediaType: TmdbMediaType;
  }
) {
  const [found] = await this.listItemRepository.find(listItemInfo);
  if (!found) {
    throw new Error("List item does not exists");
  }
  return found;
}

export async function addListItems(
  this: ListLogic,
  listItemInfos: PartialListItem[]
): Promise<ListItem[]> {
  const addedListItems = [];

  for (const listItemInfo of listItemInfos) {
    const listItem = makeListItem(listItemInfo);

    const [[list], [autoList], foundListItems] = await Promise.all([
      this.listRepository.find({
        id: listItem.listId,
      }),
      this.autoListRepository.find({
        id: listItem.listId,
      }),
      this.listItemRepository.find({
        listId: listItem.listId,
        mediaId: listItem.mediaId,
      }),
    ]);

    if (!list && !autoList) {
      throw new Error("list does not exists");
    }

    if (foundListItems.length > 0) {
      throw new Error("try to add duplicate list item");
    }

    await this.listItemRepository.add([listItem]);

    if (list) {
      const updatedList = updateList(list, {});
      await this.listRepository.update(list.id, updatedList);
    }

    addedListItems.push(listItem);
  }

  return addedListItems;
}
