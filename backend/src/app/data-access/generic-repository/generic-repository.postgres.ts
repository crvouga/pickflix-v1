import { removeNullOrUndefinedEntries } from "../../utils";
import {
  IPostgresDatabase,
  queryBuilder,
  IPostgresRespository,
} from "../database.postgres";
import {
  GenericRepositoryQueryOptions,
  Identifiable,
  IGenericRepository,
  RepositoryQuerySpec,
} from "./types";

// just in case limit
const LIMIT = 10000;

export class GenericRepositoryPostgres<I, Entity extends Identifiable<I>, Row>
  implements IGenericRepository<I, Entity>, IPostgresRespository {
  database: IPostgresDatabase;
  tableName: string;
  mapPartialEntityToPartialRow: (partial: Partial<Entity>) => Partial<Row>;
  mapRowToEntity: (row: Row) => Entity;
  mapEntityKeyToRowKey: (key: keyof Entity) => keyof Row;

  constructor({
    database,
    tableName,
    mapPartialEntityToPartialRow,
    mapRowToEntity,
    mapEntityKeyToRowKey,
  }: {
    database: IPostgresDatabase;
    tableName: string;
    mapPartialEntityToPartialRow: (partial: Partial<Entity>) => Partial<Row>;
    mapRowToEntity: (row: Row) => Entity;
    mapEntityKeyToRowKey: (key: keyof Entity) => keyof Row;
  }) {
    this.database = database;
    this.tableName = tableName;
    this.mapPartialEntityToPartialRow = mapPartialEntityToPartialRow;
    this.mapRowToEntity = mapRowToEntity;
    this.mapEntityKeyToRowKey = mapEntityKeyToRowKey;
  }

  async initializeTables() {
    throw new Error("not implemented");
  }

  async find(
    specs: RepositoryQuerySpec<Entity>,
    options?: GenericRepositoryQueryOptions<Entity>
  ): Promise<Entity[]> {
    const orderBy: { column: keyof Row; order: "asc" | "desc" }[] =
      options?.orderBy?.map(([key, direction]) => ({
        column: this.mapEntityKeyToRowKey(key),
        order: direction === "ascend" ? "asc" : "desc",
      })) || [];

    const offset = options?.pagination
      ? options.pagination.page * options.pagination.pageSize
      : 0;

    const limit = options?.pagination?.pageSize || LIMIT;

    const sql = queryBuilder(this.tableName)
      .where((builder) => {
        for (const spec of specs) {
          const row = this.mapPartialEntityToPartialRow(spec);

          builder.orWhere(removeNullOrUndefinedEntries(row));
        }
      })
      .orderBy(orderBy)
      .offset(offset)
      .limit(limit)
      .toQuery();

    const rows = await this.database.query<Row>(sql);

    const entities = rows.map((row) => this.mapRowToEntity(row));

    return entities;
  }

  async search<K extends keyof Entity>(
    query: string,
    keys: K[],
    options?: GenericRepositoryQueryOptions<Entity>
  ): Promise<Entity[]> {
    const orderBy: { column: keyof Row; order: "asc" | "desc" }[] =
      options?.orderBy?.map(([key, direction]) => {
        const column = this.mapEntityKeyToRowKey(key);
        const order = direction === "ascend" ? "asc" : "desc";

        return {
          column,
          order,
        };
      }) || [];

    const offset = options?.pagination
      ? options.pagination.page * options.pagination.pageSize
      : 0;

    const limit = options?.pagination?.pageSize || LIMIT;

    const sql = queryBuilder<Row>(this.tableName)
      .where((builder) => {
        for (const key of keys) {
          const column = String(this.mapEntityKeyToRowKey(key));
          builder.orWhere(column, "like", `%${query}%`);
        }
      })
      .orderBy(orderBy)
      .offset(offset)
      .limit(limit)
      .toQuery();

    const rows = await this.database.query<Row>(sql);

    const entities = rows.map((row) => this.mapRowToEntity(row));

    return entities;
  }

  async count(specs: RepositoryQuerySpec<Entity>): Promise<number> {
    const sql = queryBuilder(this.tableName)
      .count()
      .where((builder) => {
        for (const spec of specs) {
          builder.orWhere(
            removeNullOrUndefinedEntries(
              this.mapPartialEntityToPartialRow(spec)
            )
          );
        }
      })
      .toQuery();

    const rows = await this.database.query<{ count: string }>(sql);

    const count = Number(rows[0].count) || 0;

    return count;
  }

  async add(entities: Entity[]) {
    const rows = entities.map((entity) =>
      this.mapPartialEntityToPartialRow(entity)
    );

    const sql = queryBuilder(this.tableName).insert(rows).toQuery();

    await this.database.query(sql);
  }

  async remove(specs: Partial<Entity>[]) {
    const sql = queryBuilder(this.tableName)
      .where((builder) => {
        for (const spec of specs) {
          builder.orWhere(
            removeNullOrUndefinedEntries(
              this.mapPartialEntityToPartialRow(spec)
            )
          );
        }
      })
      .delete()
      .toQuery();

    await this.database.query(sql);
  }

  async update(id: I, partial: Partial<Entity>) {
    const partialRow = this.mapPartialEntityToPartialRow(partial);

    const sql = queryBuilder(this.tableName)
      .where({ id: id })
      .update(partialRow)
      .toQuery();

    await this.database.query(sql);
  }
}
