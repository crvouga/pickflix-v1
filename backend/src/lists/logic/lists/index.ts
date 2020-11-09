import { UserId } from "../../../users/models/make-user";
import { List, ListId, makeList, PartialList } from "../../models";
import { ListLogic } from "../build";

export async function addLists(
  this: ListLogic,
  listInfos: PartialList[]
): Promise<List[]> {
  const {
    unitOfWork: { Lists },
  } = this;

  const lists = listInfos.map((listInfo) => makeList(listInfo));
  const added = await Lists.add(lists);

  return added;
}

export async function getListAggergations(
  this: ListLogic,
  listInfo: { id: ListId } | { ownerId: UserId }
) {
  const {
    unitOfWork: { Lists },
  } = this;

  const lists = await Lists.find(listInfo, {
    orderBy: [["updatedAt", "descend"]],
  });

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list))
  );

  return aggergatedLists;
}

export async function editLists(
  this: ListLogic,
  listInfos: Array<Partial<List> & Pick<List, "id">>
): Promise<List[]> {
  try {
    await this.unitOfWork.begin();

    const editedLists = [];

    for (const { id, ...listInfo } of listInfos) {
      const foundLists = await this.unitOfWork.Lists.find({ id });

      if (foundLists.length === 0) {
        throw new Error("try to edit list that does not exists");
      }

      const existingList = foundLists[0];

      const editedList = makeList({
        ...existingList,
        ...listInfo,
      });

      await this.unitOfWork.Lists.update([editedList]);

      editedLists.push(editedList);
    }

    await this.unitOfWork.commit();

    return editedLists;
  } catch (error) {
    await this.unitOfWork.rollback();
    throw error;
  }
}

export async function removeLists(
  this: ListLogic,
  ids: { id: ListId }[]
): Promise<void> {
  const { Lists } = this.unitOfWork;
  await Lists.remove(ids);
}
