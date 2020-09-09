import {v4, validate} from 'uuid';
import {Id, IsValidId, MakeId} from './types';

export const makeId: MakeId = () => v4() as Id;
export const isValidId: IsValidId = id => (validate(id) ? (id as Id) : false);
