import { UserId } from "../../../users/models/make-user";
import { List, ListId, makeList, PartialList, updateList } from "../../models";
import { ListLogic } from "../logic";
import { PaginationOptions } from "../../../app/data-access/types";
import { removeNullOrUndefinedEntries } from "../../../app/utils";

export async function addList(this: ListLogic, partial: PartialList) {
  const list = makeList(partial);
  await this.listRepository.add(list);
  return list;
}

export async function getListAggergations(
  this: ListLogic,
  listInfo: { id?: ListId; ownerId?: UserId },
  pagination?: PaginationOptions
) {
  const lists = await this.listRepository.find(
    removeNullOrUndefinedEntries(listInfo),
    {
      orderBy: [["updatedAt", "descend"]],
      pagination,
    }
  );

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list))
  );

  return aggergatedLists;
}

export async function editList(
  this: ListLogic,
  listInfo: Partial<List> & Pick<List, "id">
) {
  const { id, ...edits } = listInfo;

  const [found] = await this.listRepository.find({ id });

  if (!found) {
    throw new Error("try to edit list that does not exists");
  }

  const updated = updateList(found, edits);

  await this.listRepository.update(id, updated);

  return updated;
}

export async function removeList(this: ListLogic, id: ListId): Promise<void> {
  await this.listRepository.remove(id);
}
