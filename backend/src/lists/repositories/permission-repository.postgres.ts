import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/data-access/database.postgres";
import { GenericRepositoryPostgres } from "../../app/data-access/generic-repository/generic-repository.postgres";
import { castUserId, UserId } from "../../users/models";
import {
  castListId,
  castPermissionId,
  castPermissionType,
  Permission,
  PermissionId,
  PermissionType,
  ListId,
} from "../models";
import { IPermissionRepository } from "./permission-repository";
import { Timestamp, castTimestamp } from "../../app/utils";

const tableName = "permissions";

type PermissionRow = {
  permission_type: PermissionType;
  id: PermissionId;
  user_id: UserId;
  list_id: ListId;
  created_at: Timestamp;
};

const table: IPostgresTable<PermissionRow> = {
  permission_type: {
    dataType: "TEXT",
  },
  id: {
    dataType: "TEXT",
  },
  user_id: {
    dataType: "TEXT",
  },
  list_id: {
    dataType: "TEXT",
  },
  created_at: {
    dataType: "BIGINT",
  },
};

const mapEntityKeyToRowKey = (key: keyof Permission): keyof PermissionRow => {
  switch (key) {
    case "id":
      return "id";
    case "createdAt":
      return "created_at";
    case "permissionType":
      return "permission_type";
    case "userId":
      return "user_id";
    case "listId":
      return "list_id";
    default:
      throw new Error("unsupported case");
  }
};

const mapPartialEntityToPartialRow = (
  entity: Partial<Permission>
): Partial<PermissionRow> => {
  return {
    id: entity.id,
    permission_type: entity.permissionType,
    user_id: entity.userId,
    list_id: entity.listId,
    created_at: entity.createdAt,
  };
};

const mapRowToEntity = (row: PermissionRow): Permission => {
  return {
    permissionType: castPermissionType(row.permission_type),
    id: castPermissionId(row.id),
    userId: castUserId(row.user_id),
    listId: castListId(row.list_id),
    createdAt: castTimestamp(row.created_at),
  };
};

export class PermissionRepositoryPostgres
  implements IPermissionRepository, IPostgresRespository {
  repository: GenericRepositoryPostgres<
    PermissionId,
    Permission,
    PermissionRow
  >;

  constructor(database: IPostgresDatabase) {
    this.repository = new GenericRepositoryPostgres<
      PermissionId,
      Permission,
      PermissionRow
    >({
      database,
      tableName,
      mapEntityKeyToRowKey,
      mapPartialEntityToPartialRow,
      mapRowToEntity,
    });
  }

  async initializeTables() {
    await this.repository.database.createTableIfDoesNotExists(tableName, table);
  }
  async find(spec: Partial<Permission>) {
    return await this.repository.find([spec]);
  }

  async add(permission: Permission) {
    await this.repository.add([permission]);
  }

  async remove(id: PermissionId) {
    await this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Permission>) {
    return await this.repository.count([spec]);
  }
}
