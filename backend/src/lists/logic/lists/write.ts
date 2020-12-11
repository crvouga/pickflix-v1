import { UserId } from "../../../users/models/make-user";
import { ListId, makeList, PartialList, updateList } from "../../models";
import { ListLogic } from "../logic";

export async function addList(this: ListLogic, partialList: PartialList) {
  const list = makeList(partialList);

  await this.listRepository.add(list);

  return list;
}

export async function removeList(
  this: ListLogic,
  { listId, userId }: { listId: ListId; userId: UserId }
): Promise<void> {
  if (await this.isOwner({ listId, userId })) {
    await this.listRepository.remove(listId);
  }
}

export async function editList(
  this: ListLogic,
  {
    listId,
    userId,
    edits,
  }: {
    listId: ListId;
    userId: UserId;
    edits: {
      title?: string;
      description?: string;
    };
  }
) {
  if (!(await this.isEditorOrOwner({ userId, listId }))) {
    throw new Error("User not allowed to edit list");
  }

  const [found] = await this.listRepository.find([{ id: listId }]);

  if (!found) {
    throw new Error("Try to edit list that does not exists");
  }

  const updated = updateList(found, edits);

  await this.listRepository.update(listId, updated);

  return updated;
}
