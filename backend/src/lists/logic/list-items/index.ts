import { ListId, ListItem, makeListItem } from "../../models";
import { ListItemId, PartialListItem } from "../../models/make-list-item";
import { ListLogic } from "../build";
import { TmdbMediaId, TmdbMediaType } from "../../../media/models/types";

export async function removeListItems(
  this: ListLogic,
  listItemInfos: { id: ListItemId }[]
) {
  await this.unitOfWork.ListItems.remove(listItemInfos);
}

export async function getListItemAggergations(
  this: ListLogic,
  listItemInfo:
    | {
        listId: ListId;
      }
    | {
        listId: ListId;
        tmdbMediaId: TmdbMediaId;
        tmdbMediaType: TmdbMediaType;
      }
) {
  const { ListItems } = this.unitOfWork;

  const listItems = await ListItems.find(listItemInfo);

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
  const { ListItems } = this.unitOfWork;
  const [found] = await ListItems.find(listItemInfo);
  if (!found) {
    throw new Error("List item does not exists");
  }
  return found;
}

export async function addListItems(
  this: ListLogic,
  listItemInfos: PartialListItem[]
): Promise<ListItem[]> {
  const { ListItems, Lists, AutoLists } = this.unitOfWork;

  const addedListItems = [];

  for (const listItemInfo of listItemInfos) {
    const listItem = makeListItem(listItemInfo);

    const [foundLists, foundAutoLists, foundListItems] = await Promise.all([
      Lists.find({
        id: listItem.listId,
      }),
      AutoLists.find({
        id: listItem.listId,
      }),
      ListItems.find({
        listId: listItem.listId,
        tmdbMediaId: listItem.tmdbMediaId,
        tmdbMediaType: listItem.tmdbMediaType,
      }),
    ]);

    if (foundLists.length === 0 && foundAutoLists.length === 0) {
      throw new Error("list does not exists");
    }

    if (foundListItems.length > 0) {
      throw new Error("try to add duplicate list item");
    }

    const [addedListItem] = await ListItems.add([listItem]);
    addedListItems.push(addedListItem);
  }

  return addedListItems;
}
