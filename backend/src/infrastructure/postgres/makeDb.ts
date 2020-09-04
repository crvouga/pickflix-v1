import pg from 'pg';
import pgClientConfigs from './pgClientConfigs';
import {Db} from './Db';

const env = process.env.NODE_ENV || 'development';
const clientConfig = pgClientConfigs[env];
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
