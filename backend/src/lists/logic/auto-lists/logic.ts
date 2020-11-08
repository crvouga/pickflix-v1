import { User, UserId } from "../../../users/models/make-user";
import { AutoList, makeAutoList, ListId } from "../../models";
import { INITIAL_AUTO_LIST_INFOS } from "../../models/constants";
import { ListLogic } from "../build";

export async function initializeAutoLists(
  this: ListLogic,
  { user }: { user: User }
) {
  for (const { key } of INITIAL_AUTO_LIST_INFOS) {
    const found = await this.unitOfWork.AutoLists.find({
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
  listInfo: { id: ListId } | { ownerId: UserId }
) {
  const { AutoLists } = this.unitOfWork;

  const lists = await AutoLists.find(listInfo);

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list))
  );

  return aggergatedLists;
}
