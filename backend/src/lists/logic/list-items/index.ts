import { TmdbMediaId, TmdbMediaType } from "../../../media/models/types";
import { ListId, ListItem, makeList, makeListItem } from "../../models";
import { ListItemId, PartialListItem } from "../../models/make-list-item";
import { ListLogic } from "../build";

export async function removeListItems(
  this: ListLogic,
  listItemInfos: (
    | {
        id: ListItemId;
      }
    | {
        listId: ListId;
        tmdbMediaId: TmdbMediaId;
        tmdbMediaType: TmdbMediaType;
      }
  )[]
) {
  const { ListItems } = this.unitOfWork;

  await ListItems.remove(listItemInfos);
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

  const listItems = await ListItems.find(listItemInfo, {
    orderBy: [["createdAt", "descend"]],
  });

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

    const [[list], [autoList], foundListItems] = await Promise.all([
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

    if (!list && !autoList) {
      throw new Error("list does not exists");
    }

    if (foundListItems.length > 0) {
      throw new Error("try to add duplicate list item");
    }

    const [addedListItem] = await ListItems.add([listItem]);

    if (list) {
      await Lists.update([makeList(list)]);
    }

    addedListItems.push(addedListItem);
  }

  return addedListItems;
}
