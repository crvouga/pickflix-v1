import {todoItemDb} from '../data-access';
import {buildAddItem} from './add-item';
import {buildRemoveItem} from './remove-item';
import {buildEditItem} from './edit-item';
import {buildListItems} from './list-items';

const db = todoItemDb;
export const addItem = buildAddItem({db});
export const removeItem = buildRemoveItem({db});
export const editItem = buildEditItem({db});
export const listItems = buildListItems({db});
