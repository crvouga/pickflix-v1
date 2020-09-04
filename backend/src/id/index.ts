import {v4, validate} from 'uuid';
export const makeId = () => v4();
export const isValidId = (id: string) => validate(id);
