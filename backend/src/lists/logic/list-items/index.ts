import { PaginationOptions } from "../../../app/pagination";
import { removeNullOrUndefinedEntries } from "../../../utils";
import { MediaId } from "../../../media/models/types";
import { UserId } from "../../../users/models";
import { ListId, ListItem, makeListItem, updateList } from "../../models";
import { ListItemId, PartialListItem } from "../../models/make-list-item";
import { ListItemAggergation } from "../../models/types";
import { ListLogic } from "../logic";

export async function removeListItems(
  this: ListLogic,
  spec: (
    | {
        id: ListItemId;
      }
    | {
        listId: ListId;
        mediaId: MediaId;
      }
  )[]
) {
  await this.listItemRepository.removeWhere(spec);
}

export async function aggergateListItem(
  this: ListLogic,
  listItem: ListItem
): Promise<ListItemAggergation> {
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

export async function getListItemAggergations(
  this: ListLogic,
  spec: Partial<ListItem>,
  paginationOptions?: PaginationOptions
) {
  const listItems = await this.listItemRepository.find(
    [removeNullOrUndefinedEntries(spec)],
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

export async function addListItems(
  this: ListLogic,
  listItemInfos: PartialListItem[]
): Promise<ListItem[]> {
  const addedListItems = [];

  for (const listItemInfo of listItemInfos) {
    const listItem = makeListItem(listItemInfo);

    const [[list], [autoList], foundListItems] = await Promise.all([
      this.listRepository.find([
        {
          id: listItem.listId,
        },
      ]),
      this.autoListRepository.find({
        id: listItem.listId,
      }),
      this.listItemRepository.find([
        {
          listId: listItem.listId,
          mediaId: listItem.mediaId,
        },
      ]),
    ]);

    if (!list && !autoList) {
      continue;
    }

    if (foundListItems.length > 0) {
      continue;
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

export async function toggleListItem(
  this: ListLogic,
  {
    userId,
    listId,
    mediaId,
  }: {
    userId: UserId;
    listId: ListId;
    mediaId: MediaId;
  }
) {
  const [[list], [autoList]] = await Promise.all([
    this.listRepository.find([{ id: listId }]),
    this.autoListRepository.find({ id: listId }),
  ]);

  if (!list && !autoList) {
    throw new Error("list does not exists");
  }

  const [listItem] = await this.listItemRepository.find([{ mediaId, listId }]);

  if (listItem) {
    await this.listItemRepository.remove(listItem.id);
    return false;
  } else {
    const listItem = makeListItem({ userId, listId, mediaId });
    await this.listItemRepository.add([listItem]);
    return true;
  }
}

export async function setListItems(
  this: ListLogic,
  {
    userId,
    mediaId,
    listIds,
  }: {
    userId: UserId;
    mediaId: MediaId;
    listIds: ListId[];
  }
) {
  throw new Error("not implemented");
}
