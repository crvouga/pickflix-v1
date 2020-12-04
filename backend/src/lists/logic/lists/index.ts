import {
  PaginationOptions,
  RepositoryQueryOptions,
} from "../../../app/data-access/types";
import { MediaId } from "../../../media/models/types";
import { UserId } from "../../../users/models/make-user";
import {
  List,
  ListId,
  makeList,
  PartialList,
  PermissionType,
  updateList,
} from "../../models";
import { ListAggergation } from "../../models/types";
import { ListLogic } from "../logic";
import { innerJoin } from "ramda";

export async function getListsFromUserId(
  this: ListLogic,
  { userId }: { userId: UserId },
  queryOptions?: RepositoryQueryOptions<List>
) {
  const permissions = await this.permissionRepository.find({ userId });

  const listSpec = [
    {
      ownerId: userId,
    },
    ...permissions.map((permission) => ({ id: permission.listId })),
  ];

  const lists = await this.listRepository.find(listSpec, queryOptions);

  return lists;
}

export async function getListsFromMediaIdAndUserId(
  this: ListLogic,
  { userId, mediaId }: { userId: UserId; mediaId: MediaId },
  queryOptions?: RepositoryQueryOptions<List>
) {
  const [autoListsFromUserId, listsFromUserId] = await Promise.all([
    this.autoListRepository.find({
      ownerId: userId,
    }),
    this.getListsFromUserId({ userId }, queryOptions),
  ]);

  const allListsFromUserId = [...autoListsFromUserId, ...listsFromUserId];

  const listItemSpec = allListsFromUserId.map((list) => ({
    listId: list.id,
    mediaId: mediaId,
  }));

  const listItemsFromListIdsAndMediaId = await this.listItemRepository.find(
    listItemSpec
  );

  const listsFromMediaIdAndUserId = innerJoin(
    (list, listItem) => list.id === listItem.listId,
    allListsFromUserId,
    listItemsFromListIdsAndMediaId
  );

  return listsFromMediaIdAndUserId;
}

export async function addList(this: ListLogic, partialList: PartialList) {
  const list = makeList(partialList);

  await this.listRepository.add(list);

  return list;
}

export async function aggergateList(
  this: ListLogic,
  list: List
): Promise<ListAggergation> {
  const [
    listItemCount,
    listItems,
    [owner],
    editorPermissions,
  ] = await Promise.all([
    this.listItemRepository.count([
      {
        listId: list.id,
      },
    ]),
    this.getListItemAggergations(
      {
        listId: list.id,
      },
      {
        page: 1,
        pageSize: 4,
      }
    ),
    this.userRepository.find([
      {
        id: list.ownerId,
      },
    ]),
    this.permissionRepository.find({
      listId: list.id,
      permissionType: PermissionType.Editor,
    }),
  ]);

  const userSpec = editorPermissions.map((permission) => ({
    id: permission.userId,
  }));

  const editors = await this.userRepository.find(userSpec);

  return {
    listItems,
    listItemCount,
    list,
    owner,
    editors,
  };
}

export async function getListAggergationsFromId(
  this: ListLogic,
  spec: { id: ListId },
  queryOptions?: RepositoryQueryOptions<List>
) {
  const lists = await this.listRepository.find([spec], queryOptions);

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list))
  );

  return aggergatedLists;
}

export async function getListAggergationsFromUserId(
  this: ListLogic,
  { userId }: { userId: UserId },
  queryOptions?: RepositoryQueryOptions<List>
) {
  const permissions = await this.permissionRepository.find({
    userId,
  });

  const listSpec = [
    ...permissions.map((permission) => ({ id: permission.listId })),
    { ownerId: userId },
  ];

  const lists = await this.listRepository.find(listSpec, queryOptions);

  const aggergatedLists = await Promise.all(
    lists.map((list) => this.aggergateList(list))
  );

  return aggergatedLists;
}

export async function getListAggergations(
  this: ListLogic,
  spec: { id: ListId } | { userId: UserId },
  queryOptions?: RepositoryQueryOptions<List>
) {
  if ("id" in spec) {
    return this.getListAggergationsFromId(spec, queryOptions);
  }
  if ("userId" in spec) {
    return this.getListAggergationsFromUserId(spec, queryOptions);
  }
  return [];
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

export async function getList(this: ListLogic, { listId }: { listId: ListId }) {
  const found = await this.listRepository.find([{ id: listId }]);

  if (found.length === 0) {
    throw new Error("Failed to get list");
  }

  return found[0];
}

export async function removeList(
  this: ListLogic,
  { listId, userId }: { listId: ListId; userId: UserId }
): Promise<void> {
  if (await this.isOwner({ listId, userId })) {
    await this.listRepository.remove(listId);
  }
}
