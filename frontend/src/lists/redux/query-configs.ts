import { schema } from "normalizr";
import * as R from "ramda";
import { QueryConfig } from "redux-query";
import { backendURL } from "../../backendAPI";
import {
  EntityKeys,
  IList,
  IListItem,
  listItemSchema,
  listSchema,
} from "./entities";
import { IById, normalizeData } from "./normalize";

const mergeDeepRight = (previous = {}, next = {}) =>
  R.mergeDeepRight(previous, next);

export const listsRequest = (): QueryConfig => {
  return {
    url: `${backendURL}/api/lists`,

    transform: (data: IList[]) => {
      const normalized = normalizeData<EntityKeys, IList>(
        data,
        new schema.Array(listSchema)
      );
      return normalized.entities;
    },

    update: {
      [EntityKeys.lists]: (prev: IById<IList>, next: IById<IList>) => next,
    },

    force: true,
  };
};

export const listRequest = ({ listId }: { listId: string }): QueryConfig => {
  return {
    url: `${backendURL}/api/lists/${listId}`,
    transform: (data: IList[]) => {
      const normalized = normalizeData<EntityKeys, IList[]>(
        data,
        new schema.Array(listSchema)
      );
      return normalized.entities;
    },
    update: {
      [EntityKeys.lists]: mergeDeepRight,
      [EntityKeys.listItems]: mergeDeepRight,
    },
    force: true,
  };
};

export const listItemsRequest = ({
  listId,
}: {
  listId: string;
}): QueryConfig => {
  return {
    url: `${backendURL}/api/lists/${listId}/list-items`,
    transform: (data: IListItem) => {
      const normalized = normalizeData<EntityKeys, IListItem>(
        data,
        listItemSchema
      );
      return normalized.entities;
    },
    update: {
      [EntityKeys.listItems]: mergeDeepRight,
    },
    force: true,
  };
};

export const addListItemMutation = (
  listItemInfo: Partial<IListItem>
): QueryConfig => {
  return {
    force: true,
    options: {
      method: "POST",
    },
    url: `${backendURL}/api/lists/${listItemInfo.listId}/list-items`,
    body: {
      ...listItemInfo,
    },
  };
};

export const createListMutation = (listInfo: Partial<IList>): QueryConfig => {
  return {
    options: {
      method: "POST",
    },
    url: `${backendURL}/api/lists`,
    body: {
      ...listInfo,
    },
    transform: (data: IList) => {
      const normalized = normalizeData<EntityKeys, IList>(data, listSchema);
      return normalized.entities;
    },
    update: {
      [EntityKeys.lists]: mergeDeepRight,
    },
  };
};

export const deleteListMutation = ({
  listId,
}: {
  listId: string;
}): QueryConfig => {
  return {
    options: {
      method: "DELETE",
    },
    url: `${backendURL}/api/lists/${listId}`,
    update: {
      [EntityKeys.lists]: (prev: IById<IList>) => R.dissoc(listId, prev),
    },
  };
};

export const deleteListItemsMutation = ({
  listId,
  listItemIds,
}: {
  listId: string;
  listItemIds: string[];
}): QueryConfig => {
  return {
    options: {
      method: "DELETE",
    },
    url: `${backendURL}/api/lists/${listId}/list-items`,
    body: [...listItemIds],
    update: {
      listItems: (prev: IById<IListItem>) => R.omit(listItemIds, prev),
    },
  };
};

export const editListMutation = (listInfo: Partial<IList>): QueryConfig => {
  return {
    options: {
      method: "PATCH",
    },
    url: `${backendURL}/api/lists/${listInfo.id}`,
    body: {
      ...listInfo,
    },
    transform: (data: IList) => {
      const normalized = normalizeData<EntityKeys, IList>(data, listSchema);
      return normalized.entities;
    },
    update: {
      lists: mergeDeepRight,
    },
  };
};
