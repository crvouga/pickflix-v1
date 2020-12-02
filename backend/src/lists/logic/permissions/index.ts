import { ListLogic } from "../logic";
import { UserId } from "../../../users/models";
import { ListId, PermissionType, makePermission } from "../../models";

export async function addPermission(
  this: ListLogic,
  {
    userId,

    listId,
  }: {
    userIdWithPermission: UserId;
    userId: UserId;
    listId: ListId;
  }
) {
  const [permission] = await this.permissionRepository.find({
    listId,
  });

  if (!permission) {
    throw new Error("User does not have permission to add permission");
  }
}

export async function transferOwnerPermission(
  this: ListLogic,
  {
    ownerId,
    userId,
    listId,
  }: {
    ownerId: UserId;
    userId: UserId;
    listId: ListId;
  }
) {
  const [[ownerPermission], [nonOwnerPermission]] = await Promise.all([
    this.permissionRepository.find({
      userId: ownerId,
      listId,
      permissionType: PermissionType.Owner,
    }),
    this.permissionRepository.find({
      userId: ownerId,
      listId,
    }),
  ]);

  if (!ownerPermission) {
    throw new Error("owner permission does not exists");
  }

  if (!nonOwnerPermission) {
    throw new Error(
      "can not transfer to user that does not previous permission"
    );
  }

  const previousOwnerPermission = makePermission({
    permissionType: PermissionType.Editor,
    userId: ownerId,
    listId,
  });
}
