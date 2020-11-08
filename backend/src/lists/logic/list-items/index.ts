import { ListId, ListItem, makeListItem } from "../../models";
import { ListItemId, PartialListItem } from "../../models/make-list-item";
import { ListLogic } from "../build";

export async function removeListItems(
  this: ListLogic,
  listItemInfos: { id: ListItemId }[]
) {
  await this.unitOfWork.ListItems.remove(listItemInfos);
}

export async function getListItemAggergations(
  this: ListLogic,
  {
    listId,
  }: {
    listId: ListId;
  }
) {
  const listItems = await this.unitOfWork.ListItems.find({ listId });

  const aggergatedListItems = await Promise.all(
    listItems.map((listItem) => this.aggergateListItem(listItem))
  );

  return aggergatedListItems;
}

export async function addListItems(
  this: ListLogic,
  listItemInfos: PartialListItem[]
): Promise<ListItem[]> {
  const {
    unitOfWork: { ListItems, Lists, AutoLists },
  } = this;

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
      // throw new Error('try to add duplicate list item');
      return [];
    }

    const [addedListItem] = await ListItems.add([listItem]);
    addedListItems.push(addedListItem);
  }

  return addedListItems;
}
