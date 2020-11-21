import { UserId } from "../../../users/models/make-user";
import { List, ListId, makeList, PartialList, updateList } from "../../models";
import { ListLogic } from "../build";
import { PaginationOptions } from "../../../common/unit-of-work/types";
import { removeNullOrUndefinedEntries } from "../../../common/utils";

export async function addLists(
  this: ListLogic,
  listInfos: PartialList[]
): Promise<List[]> {
  const { Lists } = this.unitOfWork;
  const lists = listInfos.map(makeList);

  const added = await Lists.add(lists);

  return added;
}

export async function getListAggergations(
  this: ListLogic,
  listInfo: { id?: ListId; ownerId?: UserId },
  pagination?: PaginationOptions
) {
  const { Lists } = this.unitOfWork;

  const lists = await Lists.find(removeNullOrUndefinedEntries(listInfo), {
    orderBy: [["updatedAt", "descend"]],
    pagination,
  });

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list))
  );

  return aggergatedLists;
}

export async function editLists(
  this: ListLogic,
  listInfos: (Partial<List> & Pick<List, "id">)[]
): Promise<List[]> {
  const { Lists, begin, commit, rollback } = this.unitOfWork;
  try {
    await begin();

    const editedLists = [];

    for (const { id, ...edits } of listInfos) {
      const foundLists = await Lists.find({ id });

      if (foundLists.length === 0) {
        throw new Error("try to edit list that does not exists");
      }

      const existing = foundLists[0];

      const editedList = updateList(existing, edits);

      await Lists.update(editedList);

      editedLists.push(editedList);
    }

    await commit();

    return editedLists;
  } catch (error) {
    await rollback();
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
