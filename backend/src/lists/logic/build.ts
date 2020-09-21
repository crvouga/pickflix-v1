import {buildAddListItems} from './add-list-items/logic';
import {buildAddLists} from './add-lists/logic';
import {buildEditLists} from './edit-lists/logic';
import {buildGetListItems} from './get-list-items/logic';
import {buildGetLists} from './get-lists/logic';
import {buildRemoveListItems} from './remove-list-items/logic';
import {Build, ListLogic} from './types';
import {buildRemoveLists} from './remove-lists';

export const buildListLogic: Build<ListLogic> = dependencies => {
  const addLists = buildAddLists(dependencies);
  const getLists = buildGetLists(dependencies);
  const addListItems = buildAddListItems(dependencies);
  const getListItems = buildGetListItems(dependencies);
  const removeListItems = buildRemoveListItems(dependencies);
  const editLists = buildEditLists(dependencies);
  const removeLists = buildRemoveLists(dependencies);

  return {
    getLists,
    addLists,
    addListItems,
    getListItems,
    removeListItems,
    removeLists,
    editLists,
  };
};
