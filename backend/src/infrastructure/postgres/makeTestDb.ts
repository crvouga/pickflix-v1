import pg from 'pg';
import fs from 'fs';
import pgClientConfigs from './pgClientConfigs';
import {Db} from './Db';

const pool = new pg.Pool(pgClientConfigs.test);

export const makeTestDb = async (): Promise<Db> => {
  const query = async (sql: string) => {
    const res = await pool.query(sql);
    return res;
  };
  return {
    query,
  };
};

const createAllTabslSql = fs.readFileSync(__dirname + '/tables.sql').toString();

const dropAllTablesSql = `
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  GRANT ALL ON SCHEMA public TO postgres;
  GRANT ALL ON SCHEMA public TO public;`;

export const clearTestDb = async () => {
  await pool.query(dropAllTablesSql);
  await pool.query(createAllTabslSql);
};
