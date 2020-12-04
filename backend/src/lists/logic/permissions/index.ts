import { ListLogic } from "../logic";
import { UserId } from "../../../users/models";
import { ListId, PermissionType, makePermission } from "../../models";

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
