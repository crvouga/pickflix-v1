import pg from "pg";
import { Db } from "./Db";
import getPgClientConfigs from "./pgClientConfigs";

const clientConfig = getPgClientConfigs();
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
