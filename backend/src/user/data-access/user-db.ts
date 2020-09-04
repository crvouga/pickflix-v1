import {UserDb} from './UserDb';
import {makeUser} from '../business-entities';
import {User} from '../business-entities/user';
import {Db} from '../../infrastructure/postgres/Db';

type Dependencies = {
  makeDb: () => Promise<Db>;
};

type Build = (_: Dependencies) => UserDb;

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
    id,
    firebaseId: firebase_id,
  });
};

const build: Build = ({makeDb}) => {
  const insert = async (user: User): Promise<User> => {
    const {id, firebaseId} = user;

    const query = `
      INSERT INTO user_identity (id, firebase_id)
      VALUES ('${id}', '${firebaseId}')
      RETURNING *`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity)[0];
  };

  const findAll = async (): Promise<User[]> => {
    const query = 'SELECT * FROM user_identity';
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity);
  };

  const findById = async (id: string): Promise<User> => {
    const query = `
      SELECT * FROM user_identity
      WHERE id='${id}'
    `;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity)[0];
  };

  const findByIds = async ({firebaseId}: Partial<User>): Promise<User> => {
    const query = `
      SELECT * FROM user_identity
      WHERE firebase_id='${firebaseId}'`;

    const db = await makeDb();
    const res = await db.query(query);

    return res.rows.map(rowToEntity)[0];
  };

  const remove = async (id: string): Promise<boolean> => {
    const query = `DELETE FROM user_identity WHERE id='${id}'`;
    const db = await makeDb();
    await db.query(query);
    return true;
  };

  return {
    insert,
    findAll,
    findById,
    findByIds,
    remove,
  };
};

export default build;
