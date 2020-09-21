import {Id} from '../../id/types';
import {Db} from '../../unit-of-work/postgres/Db';
import {makeUser} from '../models';
import {User} from '../models/types';
import {UserStorage} from './types';

type Build = (_: {makeDb: () => Promise<Db>}) => UserStorage;

type Row = {
  id: string;
  firebase_id: string;
};

const rowToEntity = (row: Row): User | undefined => {
  if (!row) {
    return undefined;
  }
  const {id, firebase_id} = row;
  return makeUser({
    id: id as Id,
    firebaseId: firebase_id,
  });
};

export const buildUserStorage: Build = ({makeDb}) => {
  return {
    insert: async user => {
      const {id, firebaseId} = user;
      const query = `
      INSERT INTO user_identity (id, firebase_id)
      VALUES ('${id}', '${firebaseId}')
      RETURNING *`;
      const db = await makeDb();
      const res = await db.query(query);
      return res.rows.map(rowToEntity)[0];
    },

    findAll: async () => {
      const query = 'SELECT * FROM user_identity';
      const db = await makeDb();
      const res = await db.query(query);
      return res.rows.map(rowToEntity);
    },

    findById: async id => {
      const query = `
      SELECT * FROM user_identity
      WHERE id='${id}'
    `;
      const db = await makeDb();
      const res = await db.query(query);
      return res.rows.map(rowToEntity)[0];
    },

    findByIds: async ({firebaseId}) => {
      const query = `
      SELECT * FROM user_identity
      WHERE firebase_id='${firebaseId}'`;
      const db = await makeDb();
      const res = await db.query(query);
      return res.rows.map(rowToEntity)[0];
    },

    remove: async id => {
      const query = `DELETE FROM user_identity WHERE id='${id}'`;
      const db = await makeDb();
      await db.query(query);
      return true;
    },
  };
};
