import { normalize, schema } from "normalizr";
import * as R from "ramda";
import { backendURL } from "../../backendAPI";

import { listItemSchema, listSchema } from "./schemas";
const updater = (previous = {}, next = {}) => R.mergeDeepRight(previous, next);

export const listsRequest = () => {
  return {
    url: `${backendURL}/api/lists`,
    transform: (responseBody) => {
      const {
        entities: { lists },
      } = normalize(responseBody, [listSchema]);
      return {
        lists,
      };
    },
    update: {
      lists: updater,
    },
    force: true,
  };
};

export const listRequest = ({ listId }) => {
  return {
    url: `${backendURL}/api/lists/${listId}`,
    transform: (responseBody) => {
      const {
        entities: { lists, listItems },
      } = normalize(responseBody, listSchema);

      return {
        lists,
        listItems,
      };
    },
    update: {
      lists: updater,
      listItems: updater,
    },
    force: true,
  };
};

export const listItemsRequest = ({ listId }) => {
  return {
    url: `${backendURL}/api/lists/${listId}/list-items`,
    transform: (responseBody) => {
      const {
        entities: { listItems },
      } = normalize(responseBody, [listItemSchema]);

      return {
        listItems,
      };
    },
    update: {
      listItems: updater,
    },
    force: true,
  };
};

export const addListItemMutation = ({ listId, ...listItemInfo }) => {
  return {
    force: true,
    options: {
      method: "POST",
    },
    url: `${backendURL}/api/lists/${listId}/list-items`,
    body: {
      ...listItemInfo,
    },
  };
};

export const createListMutation = (listInfo) => {
  return {
    options: {
      method: "POST",
    },
    url: `${backendURL}/api/lists`,
    body: {
      ...listInfo,
    },
    transform: (responseBody) => {
      const {
        entities: { lists },
      } = normalize(responseBody, listSchema);

      return {
        lists,
      };
    },
    update: {
      lists: updater,
    },
  };
};

export const deleteListMutation = ({ listId }) => {
  return {
    options: {
      method: "DELETE",
    },
    url: `${backendURL}/api/lists/${listId}`,
    update: {
      lists: (prev, next) => R.dissoc(listId, prev),
    },
  };
};

export const deleteListItemsMutation = ({ listId, listItemIds }) => {
  return {
    options: {
      method: "DELETE",
    },
    url: `${backendURL}/api/lists/${listId}/list-items`,
    body: [...listItemIds],
    update: {
      listItems: (prev, next) => R.omit(listItemIds, prev),
    },
  };
};

export const editListMutation = ({ listId, ...listInfo }) => {
  return {
    options: {
      method: "PATCH",
    },
    url: `${backendURL}/api/lists/${listId}`,
    body: {
      ...listInfo,
    },
    transform: (responseBody) => {
      const {
        entities: { lists },
      } = normalize(responseBody, listSchema);
      return {
        lists,
      };
    },
    update: {
      lists: updater,
    },
  };
};
