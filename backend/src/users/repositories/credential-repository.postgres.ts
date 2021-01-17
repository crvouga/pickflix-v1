import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/persistence/postgres/database.postgres";
import { GenericRepositoryPostgres } from "../../app/persistence/generic-repository/generic-repository.postgres";
import { Timestamp } from "../../common/utils";
import {
  castCredential,
  Credential,
  CredentialId,
  CredentialType,
  PasswordHash,
  UserId,
} from "../models";
import { ICredentialRepository } from "./credential-repository";

const tableName = "credentials";

type CredentialRow = {
  id: CredentialId;
  user_id: UserId;
  credential_type: CredentialType;
  password_hash: PasswordHash;
  verified_at: Timestamp;
};

const table: IPostgresTable<CredentialRow> = {
  id: {
    dataType: "TEXT",
  },
  user_id: {
    dataType: "TEXT",
  },
  credential_type: {
    dataType: "TEXT",
  },
  password_hash: {
    dataType: "TEXT",
  },
  verified_at: {
    dataType: "BIGINT",
  },
};

const mapRowToEntity = (row: CredentialRow): Credential => {
  return castCredential({
    id: String(row.id),
    credentialType: String(row.credential_type),
    userId: String(row.user_id),
    passwordHash: String(row.password_hash),
    verifiedAt: Number(row.verified_at),
  });
};

const mapPartialEntityToPartialRow = (
  partial: Partial<Credential>
): Partial<CredentialRow> => {
  return {
    id: partial.id,
    credential_type: partial.credentialType,
    password_hash: partial.passwordHash,
    user_id: partial.userId,
    verified_at: partial.verifiedAt,
  };
};

const mapEntityKeyToRowKey = (key: keyof Credential): keyof CredentialRow => {
  switch (key) {
    case "credentialType":
      return "credential_type";
    case "id":
      return "id";
    case "passwordHash":
      return "password_hash";
    case "userId":
      return "user_id";
    case "verifiedAt":
      return "verified_at";
  }
};

export class CredentialRepositoryPostgres
  implements ICredentialRepository, IPostgresRespository {
  repository: GenericRepositoryPostgres<
    CredentialId,
    Credential,
    CredentialRow
  >;

  constructor(database: IPostgresDatabase) {
    this.repository = new GenericRepositoryPostgres<
      CredentialId,
      Credential,
      CredentialRow
    >({
      database,
      tableName,
      mapEntityKeyToRowKey,
      mapRowToEntity,
      mapPartialEntityToPartialRow,
    });
  }

  async initializeTables() {
    await this.repository.database.createTableIfDoesNotExists(tableName, table);
  }

  async find(spec: Partial<Credential>) {
    return this.repository.find([spec]);
  }

  async add(credential: Credential) {
    await this.repository.add([credential]);
  }

  async remove(id: CredentialId) {
    await this.repository.remove([{ id: id }]);
  }

  async update(id: CredentialId, partial: Partial<Credential>) {
    await this.repository.update(id, partial);
  }
}
