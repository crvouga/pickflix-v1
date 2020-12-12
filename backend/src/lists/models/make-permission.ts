import { UserId, castUserId } from "../../users/models";
import { ListId, castListId } from "./make-list";
import { Id, makeId, isValidId } from "../../app/id";
import { Timestamp, makeTimestamp } from "../../app/utils";

export enum PermissionType {
  Editor = "Editor",
}

export type PermissionId = Id & { PermissionId: true };

export type Permission = {
  permissionType: PermissionType;
  id: PermissionId;
  userId: UserId;
  listId: ListId;
  createdAt: Timestamp;
};

export const castPermissionType = (permissionType: any) => {
  if (permissionType === PermissionType.Editor) {
    return permissionType;
  }
  throw new Error("failed to cast permission type");
};

export const castPermissionId = (id: any) => {
  if (isValidId(id)) {
    return id as PermissionId;
  }
  throw new Error("invalid permission id");
};

export const makePermission = ({
  permissionType,
  listId,
  userId,
}: {
  permissionType: PermissionType;
  userId: UserId;
  listId: ListId;
}): Permission => {
  return Object.freeze({
    id: castPermissionId(makeId()),
    permissionType: castPermissionType(permissionType),
    userId: castUserId(userId),
    listId: castListId(listId),
    createdAt: makeTimestamp(),
  });
};
