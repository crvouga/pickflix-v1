import {UnitOfWorkInMemory, UnitOfWorkDev} from './unit-of-work.fake';
import configuration from '../configuration';

export const unitOfWork =
  configuration.env === 'development'
    ? new UnitOfWorkDev()
    : configuration.env === 'test'
    ? new UnitOfWorkInMemory()
    : new UnitOfWorkInMemory();
