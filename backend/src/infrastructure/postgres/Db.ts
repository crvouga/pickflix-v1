export interface Db {
  query(query: string): Promise<Record<string, any>>;
}
