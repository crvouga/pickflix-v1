import {UnitOfWorkInMemory, UnitOfWorkDev} from './unit-of-work.fake';

const env = process.env.NODE_ENV || 'development';

export const unitOfWork =
  env === 'development'
    ? new UnitOfWorkDev()
    : env === 'test'
    ? new UnitOfWorkInMemory()
    : new UnitOfWorkInMemory();
