import { innerJoin } from "ramda";
import { GenericRepositoryQueryOptions } from "../../../app/persistence/generic-repository/types";
import { MediaId } from "../../../media/models/types";
import { UserId } from "../../../users/models/make-user";
import { List, ListId, PermissionType } from "../../models";
import { ListAggergation } from "../../models/types";
import { ListLogic } from "../logic";

export async function getListsFromUserId(
  this: ListLogic,
  { userId }: { userId: UserId },
  queryOptions?: GenericRepositoryQueryOptions<List>
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
  queryOptions?: GenericRepositoryQueryOptions<List>
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

export async function getListsFromEditorId(
  this: ListLogic,
  { editorId }: { editorId: UserId },
  queryOptions?: GenericRepositoryQueryOptions<List>
) {
  const permissions = await this.permissionRepository.find({
    permissionType: PermissionType.Editor,
    userId: editorId,
  });

  const listSpec = permissions.map((permission) => ({ id: permission.listId }));

  const lists = await this.listRepository.find(listSpec, queryOptions);

  return lists;
}

export async function getListsFromOwnerId(
  this: ListLogic,
  { ownerId }: { ownerId: UserId },
  queryOptions?: GenericRepositoryQueryOptions<List>
) {
  const lists = await this.listRepository.find([{ ownerId }], queryOptions);

  return lists;
}

type ListSpec = {
  listId: ListId;
  ownerId: UserId;
  editorId: UserId;
  userId: UserId;
};

export async function getListsFromSpec(
  this: ListLogic,
  spec: Partial<ListSpec>,
  queryOptions?: GenericRepositoryQueryOptions<List>
) {
  const { listId, ownerId, editorId, userId } = spec;

  if (listId) {
    return this.listRepository.find([{ id: listId }], queryOptions);
  }

  if (ownerId) {
    return this.getListsFromOwnerId({ ownerId }, queryOptions);
  }

  if (editorId) {
    return this.getListsFromEditorId({ editorId }, queryOptions);
  }

  if (userId) {
    return this.getListsFromUserId({ userId }, queryOptions);
  }

  throw new Error("invalid list spec");
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
