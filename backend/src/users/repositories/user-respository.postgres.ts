import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/data-access/database.postgres";
import { GenericRepositoryPostgres } from "../../app/data-access/generic-repository/generic-repository.postgres";
import { GenericRepositoryQueryOptions } from "../../app/data-access/generic-repository/types";
import {
  castUser,
  User,
  UserId,
  castUserId,
  castUsername,
  castDisplayName,
  castEmailAddress,
} from "../models";
import { IUserRepository } from "./user-repository";

const tableName = "users";

type UserRow = {
  id: string;
  username: string;
  email_address: string;
  display_name: string;
};

const table: IPostgresTable<UserRow> = {
  id: "TEXT",
  username: "TEXT",
  email_address: "TEXT",
  display_name: "TEXT",
};

const mapPartialEntityToPartialRow = (
  user: Partial<User>
): Partial<UserRow> => {
  return {
    id: user.id,
    username: user.username,
    email_address: user.emailAddress,
    display_name: user.displayName,
  };
};

const mapRowToEntity = (row: UserRow): User => {
  return {
    type: "user",
    id: castUserId(row.id),
    username: castUsername(row.username),
    displayName: castDisplayName(row.display_name),
    emailAddress: castEmailAddress(row.email_address),
  };
};

const mapEntityKeyToRowKey = (key: keyof User): keyof UserRow => {
  switch (key) {
    case "displayName":
      return "display_name";
    case "id":
      return "id";
    case "emailAddress":
      return "email_address";
    case "username":
      return "username";
    case "type":
      throw new Error("unsupported case");
  }
};

export class UserRespositoryPostgres
  implements IUserRepository, IPostgresRespository {
  respository: GenericRepositoryPostgres<UserId, User, UserRow>;

  constructor(database: IPostgresDatabase) {
    this.respository = new GenericRepositoryPostgres({
      database,
      tableName,
      mapPartialEntityToPartialRow,
      mapRowToEntity,
      mapEntityKeyToRowKey,
    });
  }

  async initializeTables() {
    await this.respository.database.createTableIfDoesNotExists(
      tableName,
      table
    );
  }

  async find(
    spec: Partial<User>[],
    options?: GenericRepositoryQueryOptions<User>
  ) {
    return this.respository.find(spec, options);
  }

  async search(
    query: string,
    keys: ("displayName" | "username")[],
    options?: GenericRepositoryQueryOptions<User>
  ) {
    return this.respository.search(query, keys, options);
  }

  async add(user: User) {
    return this.respository.add([user]);
  }

  async remove(id: UserId) {
    return this.respository.remove([{ id }]);
  }

  async update(id: UserId, partial: Partial<User>) {
    return this.respository.update(id, partial);
  }
}
