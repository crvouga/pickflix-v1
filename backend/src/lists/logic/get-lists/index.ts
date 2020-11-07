import { TmdbMediaType, TmdbMediaId } from "../../../media/models/types";
import { UserId } from "../../../users/models/make-user";
import { AutoListKeys, ListId } from "../../models/types";
import { ListLogic } from "../build";

export async function getAutoLists(
  this: ListLogic,
  listInfo:
    | { ownerId: UserId }
    | { id: ListId }
    | { key: AutoListKeys; ownerId: UserId }
) {
  const {
    unitOfWork: { AutoLists },
  } = this;

  const autoLists = await AutoLists.find(listInfo);

  const aggergatedAutoLists = await Promise.all(
    autoLists.map((list) => this.aggergateList(list))
  );

  return aggergatedAutoLists;
}

export async function getListAggergations(
  this: ListLogic,
  listInfo: { id: ListId } | { ownerId: UserId }
) {
  const {
    unitOfWork: { Lists },
  } = this;

  const lists = await Lists.find(listInfo);

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list))
  );

  return aggergatedLists;
}

export async function getListsAndAutoLists(
  this: ListLogic,
  listInfo: { id: ListId } | { ownerId: UserId }
) {
  const [lists, autoLists] = await Promise.all([
    this.getListAggergations(listInfo),
    this.getAutoLists(listInfo),
  ]);

  const listsAndAutoLists = [...lists, ...autoLists];

  return listsAndAutoLists;
}

export async function getListsFromListItem(
  this: ListLogic,
  {
    userId,
    tmdbMediaId,
    tmdbMediaType,
  }: {
    userId: UserId;
    tmdbMediaId: TmdbMediaId;
    tmdbMediaType: TmdbMediaType;
  }
) {
  const listItems = await this.unitOfWork.ListItems.find({
    userId,
    tmdbMediaId,
    tmdbMediaType,
  });

  const listIds = listItems.map((listItem) => listItem.listId);

  const [lists, autoLists] = await Promise.all([
    this.unitOfWork.Lists.get(listIds),
    this.unitOfWork.AutoLists.get(listIds),
  ]);

  return [...lists, ...autoLists];
}
