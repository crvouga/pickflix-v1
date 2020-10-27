import pg from "pg";
import configuration from "../../configuration";
import { Db } from "./Db";
import pgClientConfigs from "./pgClientConfigs";

const clientConfig = pgClientConfigs[configuration.NODE_ENV];
const pool = new pg.Pool(clientConfig);

export const makeDb = async (): Promise<Db> => {
  const query = async (sql: string) => {
    const res = await pool.query(sql);
    return res;
  };
  return {
    query,
  };
};
