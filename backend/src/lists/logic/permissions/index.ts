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
