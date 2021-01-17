import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/persistence/postgres/database.postgres";
import { GenericRepositoryPostgres } from "../../app/persistence/generic-repository/generic-repository.postgres";
import { GenericRepositoryQueryOptions } from "../../app/persistence/generic-repository/types";
import {
  castDisplayName,
  castEmailAddress,
  castUserId,
  castUsername,
  DisplayName,
  EmailAddress,
  User,
  UserId,
  Username,
} from "../models";
import { IUserRepository } from "./user-repository";

const tableName = "users";

type UserRow = {
  id: UserId;
  username: Username;
  email_address: EmailAddress;
  display_name: DisplayName;
};

const table: IPostgresTable<UserRow> = {
  id: {
    dataType: "TEXT",
  },
  username: {
    dataType: "TEXT",
  },
  email_address: {
    dataType: "TEXT",
  },
  display_name: {
    dataType: "TEXT",
  },
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
