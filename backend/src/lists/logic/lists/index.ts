import { UserId } from "../../../users/models/make-user";
import {
  List,
  ListId,
  makeList,
  PartialList,
  updateList,
  AutoList,
} from "../../models";
import { ListLogic } from "../logic";
import { PaginationOptions } from "../../../app/data-access/types";
import { removeNullOrUndefinedEntries } from "../../../app/utils";
import { MediaId } from "../../../media/models/types";
import { ListAggergate } from "../../models/types";

export async function addList(this: ListLogic, partial: PartialList) {
  const list = makeList(partial);
  await this.listRepository.add(list);
  return list;
}

export type ListAggergationOptions = {
  pagination?: PaginationOptions;
  includeListItemWithMediaId?: MediaId;
};

export async function aggergateList<T extends List | AutoList>(
  this: ListLogic,
  list: T,
  options?: ListAggergationOptions
): Promise<ListAggergate<T>> {
  const [
    listItemCount,
    listItems,
    [owner],
    [includeListItemWithMediaId],
  ] = await Promise.all([
    this.listItemRepository.count({
      listId: list.id,
    }),
    this.getListItemAggergations(
      {
        listId: list.id,
      },
      {
        page: 1,
        pageSize: 4,
      }
    ),
    this.userRepository.find({
      id: list.ownerId,
    }),
    options?.includeListItemWithMediaId
      ? this.listItemRepository.find({
          listId: list.id,
          mediaId: options.includeListItemWithMediaId,
        })
      : Promise.resolve([]),
  ]);

  return {
    listItems,
    listItemCount,
    list,
    owner,
    includeListItemWithMediaId,
  };
}

export async function getListAggergations(
  this: ListLogic,
  spec: { id?: ListId; ownerId?: UserId },
  options?: ListAggergationOptions
) {
  const lists = await this.listRepository.find(
    removeNullOrUndefinedEntries(spec),
    {
      orderBy: [["updatedAt", "descend"]],
      pagination: options?.pagination,
    }
  );

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list, options))
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
