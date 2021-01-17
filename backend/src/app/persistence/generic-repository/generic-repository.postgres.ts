import { removeNullOrUndefinedEntries } from "../../../common/utils";
import {
  IPostgresDatabase,
  IPostgresRespository,
  queryBuilder,
} from "../postgres/database.postgres";
import {
  GenericRepositoryQueryOptions,
  Identifiable,
  IGenericRepository,
  GenericRepositoryQuerySpec,
} from "./types";

// just in case limit
const LIMIT = 10000;

type KnexOrderBy<T> = { column: keyof T; order: "asc" | "desc" }[];

type KnexQueryOptions<T> = {
  orderBy: KnexOrderBy<T>;
  offset: number;
  limit: number;
};

const cleanEntitySpec = <T>(specs: GenericRepositoryQuerySpec<T>) => {
  return specs
    .map((spec) => removeNullOrUndefinedEntries(spec))
    .filter((spec) => Object.entries(spec).length > 0);
};

/* 


DOCS: http://knexjs.org/

*/

export class GenericRepositoryPostgres<I, Entity extends Identifiable<I>, Row>
  implements IGenericRepository<I, Entity>, IPostgresRespository {
  database: IPostgresDatabase;
  tableName: string;
  //
  mapPartialEntityToPartialRow: (partial: Partial<Entity>) => Partial<Row>;
  mapRowToEntity: (row: Row) => Entity;
  mapEntityKeyToRowKey: (key: keyof Entity) => keyof Row;
  //
  queryOptionsToKnexQueryOptions: (
    options?: GenericRepositoryQueryOptions<Entity>
  ) => KnexQueryOptions<Row>;

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
    //
    this.mapPartialEntityToPartialRow = mapPartialEntityToPartialRow;
    this.mapRowToEntity = mapRowToEntity;
    this.mapEntityKeyToRowKey = mapEntityKeyToRowKey;

    //
    this.queryOptionsToKnexQueryOptions = (
      options?: GenericRepositoryQueryOptions<Entity>
    ): {
      orderBy: { column: keyof Row; order: "asc" | "desc" }[];
      offset: number;
      limit: number;
    } => {
      const orderBy: KnexOrderBy<Row> =
        options?.orderBy?.map(([key, direction]) => ({
          column: this.mapEntityKeyToRowKey(key),
          order: direction === "ascend" ? "asc" : "desc",
        })) || [];

      const offset = options?.pagination
        ? (Math.max(options.pagination.page, 1) - 1) *
          Math.max(options.pagination.pageSize, 1)
        : 0;

      const limit = options?.pagination?.pageSize || LIMIT;

      return {
        offset,
        limit,
        orderBy,
      };
    };
  }

  async initializeTables() {
    throw new Error("not implemented");
  }

  async find(
    specs: GenericRepositoryQuerySpec<Entity>,
    options?: GenericRepositoryQueryOptions<Entity>
  ): Promise<Entity[]> {
    const cleanedSpecs = cleanEntitySpec(specs);

    if (cleanedSpecs.length === 0) {
      return [];
    }

    const { limit, offset, orderBy } = this.queryOptionsToKnexQueryOptions(
      options
    );

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
    const { limit, offset, orderBy } = this.queryOptionsToKnexQueryOptions(
      options
    );

    const sql = queryBuilder<Row>(this.tableName)
      .where((builder) => {
        for (const key of keys) {
          const column = String(this.mapEntityKeyToRowKey(key));
          //WHATS "~*"? https://stackoverflow.com/questions/20336665/lower-like-vs-ilike
          builder.orWhere(column, "~*", `${query}`);
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

  async count(specs: GenericRepositoryQuerySpec<Entity>): Promise<number> {
    const cleanedSpecs = cleanEntitySpec(specs);

    if (cleanedSpecs.length === 0) {
      return 0;
    }

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
