import { User, UserId } from "../../../users/models/make-user";
import {
  AutoList,
  AutoListKeys,
  INITIAL_AUTO_LIST_INFOS,
  makeAutoList,
  ListId,
} from "../../models";
import { ListAggergate } from "../../models/types";
import { ListLogic } from "../build";

export async function initializeAutoLists(
  this: ListLogic,
  { user }: { user: User }
) {
  const { AutoLists } = this.unitOfWork;

  for (const { key } of INITIAL_AUTO_LIST_INFOS) {
    const found = await AutoLists.find({
      ownerId: user.id,
      key,
    });

    if (found.length > 0) {
      throw new Error("auto lists already initialized");
    }
  }

  const autoLists = INITIAL_AUTO_LIST_INFOS.map((info) =>
    makeAutoList({
      ...info,
      ownerId: user.id,
    })
  );

  const added = await this.unitOfWork.AutoLists.add(autoLists);

  return added;
}

export async function getAutoListAggergations(
  this: ListLogic,
  autoListInfo:
    | { id: ListId }
    | { ownerId: UserId }
    | { ownerId: UserId; key: AutoListKeys }
) {
  const { AutoLists } = this.unitOfWork;

  const lists = await AutoLists.find(autoListInfo);

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list))
  );

  return aggergatedLists;
}

export async function getAutoListAggergationsByKey(
  this: ListLogic,
  autoListInfo: { ownerId: UserId }
) {
  const aggergatedLists = await this.getAutoListAggergations(autoListInfo);

  const byKey = aggergatedLists.reduce(
    (byKey, list) => ({
      ...byKey,
      [list.list.key]: list,
    }),
    {}
  ) as { [key in AutoListKeys]: ListAggergate<AutoList> };

  return byKey;
}

export async function getAutoList(
  this: ListLogic,
  autoListInfo: { key: AutoListKeys; ownerId: UserId }
) {
  const { AutoLists } = this.unitOfWork;

  const [found] = await AutoLists.find(autoListInfo);

  if (!found) {
    throw new Error("Auto list does not exists");
  }

  return found;
}
