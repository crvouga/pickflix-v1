import { User, UserId } from "../../../users/models/make-user";
import {
  AutoList,
  AutoListKeys,
  INITIAL_AUTO_LIST_INFOS,
  ListId,
  makeAutoList,
} from "../../models";
import { AutoListAggergation } from "../../models/types";
import { ListLogic } from "../logic";

export async function addAutoLists(this: ListLogic, { user }: { user: User }) {
  for (const info of INITIAL_AUTO_LIST_INFOS) {
    const found = await this.autoListRepository.find({
      ownerId: user.id,
      key: info.key,
    });

    if (found.length === 0) {
      const autoList = makeAutoList({
        key: info.key,
        ownerId: user.id,
      });

      await this.autoListRepository.add(autoList);
    }
  }
}

export async function aggergateAutoList(
  this: ListLogic,
  autoList: AutoList
): Promise<AutoListAggergation> {
  const [listItems, listItemCount, [owner]] = await Promise.all([
    this.getListItemAggergations(
      {
        listId: autoList.id,
      },
      {
        page: 1,
        pageSize: 4,
      }
    ),
    this.listItemRepository.count([{ listId: autoList.id }]),
    this.userRepository.find([{ id: autoList.ownerId }]),
  ]);

  return {
    listItems,
    listItemCount,
    owner,
    autoList,
  };
}

export async function getAutoListAggergations(
  this: ListLogic,
  spec:
    | {
        id: ListId;
      }
    | {
        ownerId: UserId;
      }
) {
  const autoLists = await this.autoListRepository.find(spec);

  const autoListAggergations = await Promise.all(
    autoLists.map((autoList) => this.aggergateAutoList(autoList))
  );

  return autoListAggergations;
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
