import { removeNullOrUndefinedEntries } from "../../../app/utils";
import { User, UserId } from "../../../users/models/make-user";
import {
  AutoList,
  AutoListKeys,
  INITIAL_AUTO_LIST_INFOS,
  ListId,
  makeAutoList,
} from "../../models";
import { ListAggergate } from "../../models/types";
import { ListLogic } from "../logic";
import { ListAggergationOptions } from "../lists";

export async function initializeAutoLists(
  this: ListLogic,
  { user }: { user: User }
) {
  for (const { key } of INITIAL_AUTO_LIST_INFOS) {
    const found = await this.autoListRepository.find({
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

  for (const autoList of autoLists) {
    await this.autoListRepository.add(autoList);
  }

  return autoLists;
}

export async function getAutoListAggergations(
  this: ListLogic,
  spec: {
    id?: ListId;
    ownerId?: UserId;
  },
  options?: ListAggergationOptions
) {
  const lists = await this.autoListRepository.find(
    removeNullOrUndefinedEntries(spec)
  );

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list, options))
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
  const [found] = await this.autoListRepository.find(autoListInfo);

  if (!found) {
    throw new Error("Auto list does not exists");
  }

  return found;
}
