import { UserId } from "../../../users/models";
import {
  ListId,
  makePermission,
  PermissionType,
  updateList,
} from "../../models";
import { ListLogic } from "../logic";

export async function isOwner(
  this: ListLogic,
  {
    userId,
    listId,
  }: {
    userId: UserId;
    listId: ListId;
  }
) {
  const foundLists = await this.listRepository.find([
    {
      ownerId: userId,
      id: listId,
    },
  ]);

  return foundLists.length > 0;
}

export async function isEditor(
  this: ListLogic,
  {
    userId,
    listId,
  }: {
    userId: UserId;
    listId: ListId;
  }
) {
  const foundPermissions = await this.permissionRepository.find({
    permissionType: PermissionType.Editor,
    userId,
    listId,
  });

  return foundPermissions.length > 0;
}

export async function isEditorOrOwner(
  this: ListLogic,
  {
    userId,
    listId,
  }: {
    userId: UserId;
    listId: ListId;
  }
) {
  return (
    (await this.isEditor({ userId, listId })) ||
    (await this.isOwner({ userId, listId }))
  );
}

export async function addEditors(
  this: ListLogic,
  {
    listId,
    userId,
    editorIds,
  }: {
    listId: ListId;
    userId: UserId;
    editorIds: UserId[];
  }
) {
  if (!(await this.isEditorOrOwner({ userId, listId }))) {
    throw new Error("A user without any permission can not add permissions");
  }

  for (const editorId of editorIds) {
    const [foundPermission] = await this.permissionRepository.find({
      listId,
      userId: editorId,
    });

    if (foundPermission) {
      continue;
    }

    const newPermission = makePermission({
      permissionType: PermissionType.Editor,
      listId,
      userId: editorId,
    });

    await this.permissionRepository.add(newPermission);
  }
}

export async function removeEditors(
  this: ListLogic,
  {
    listId,
    userId,
    editorIds,
  }: {
    listId: ListId;
    userId: UserId;
    editorIds: UserId[];
  }
) {
  if (!(await this.isEditorOrOwner({ userId, listId }))) {
    throw new Error(
      "A user without any permission can not removed permissions"
    );
  }

  for (const editorId of editorIds) {
    const [permission] = await this.permissionRepository.find({
      listId,
      userId: editorId,
    });

    if (permission) {
      await this.permissionRepository.remove(permission.id);
    }
  }
}

export async function transferOwnership(
  this: ListLogic,
  {
    ownerId,
    listId,
    editorId,
  }: {
    ownerId: UserId;
    listId: ListId;
    editorId: UserId;
  }
) {
  const [list] = await this.listRepository.find([
    {
      id: listId,
    },
  ]);

  if (!list) {
    throw new Error(
      "tried to transfer ownership of a list that does not exists"
    );
  }

  if (list.ownerId !== ownerId) {
    throw new Error(
      "only current owner of list can transfer ownership of list"
    );
  }

  const [editorPermission] = await this.permissionRepository.find({
    userId: editorId,
    listId: listId,
    permissionType: PermissionType.Editor,
  });

  if (!editorPermission) {
    throw new Error(
      "can only transfer ownership to users who are already an editor"
    );
  }

  const newPermission = makePermission({
    listId: list.id,
    userId: ownerId,
    permissionType: PermissionType.Editor,
  });

  const updatedList = updateList(list, {
    ownerId: editorId,
  });

  //TODO: wrap this in a unit of work
  await this.permissionRepository.remove(editorPermission.id);
  await this.permissionRepository.add(newPermission);
  await this.listRepository.update(listId, updatedList);
}
