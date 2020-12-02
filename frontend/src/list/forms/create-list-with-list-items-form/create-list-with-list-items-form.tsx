import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createEventEmitter } from "../../../common/utility";
import { MediaId } from "../../../media/tmdb/types";
import {
  List,
  useAddListItemMutation,
  useCreateListMutation,
  postList,
} from "../../query";

const name: "createListWithListItemsForm" = "createListWithListItemsForm";

/* 

*/

export type CreateListWithListItemsFormState = {
  mediaIds: MediaId[];
};

/* 

*/

const initialState: CreateListWithListItemsFormState = {
  mediaIds: [],
};

/* 

*/

const slice = (state: AppState) => state.createListWithListItemsForm;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setMediaIds: createAction<MediaId[]>(name + "/SET_MEDIA_IDS"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setMediaIds.toString()]: (state, action) => {
    state.mediaIds = action.payload;
  },
});

/* 

*/

export const createListWithListItemsForm = {
  actions,
  reducer,
  selectors,
};

export const useCreateListWithListItemsFormState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    createListWithListItemsForm.actions,
    dispatch
  );
  const slice = useSelector(createListWithListItemsForm.selectors.slice);

  return {
    ...slice,
    ...actions,
  };
};

/*

*/

export const eventEmitterCreateListWithListItemsForm = createEventEmitter<{
  submit: undefined;
  submitSuccess: List;
  submitError: undefined;
  submitSettled: undefined;
}>();

/*

*/

export const useCreateListWithListItemsForm = () => {
  const formState = useCreateListWithListItemsFormState();
  const createListMutation = useCreateListMutation();
  const addListItemMutation = useAddListItemMutation();

  const submit = async ({
    title,
    mediaIds,
  }: {
    mediaIds: MediaId[];
    title: string;
  }) => {
    eventEmitterCreateListWithListItemsForm.emit("submit");
    try {
      const list = await postList({
        title,
        description: "",
      });

      if (list && mediaIds[0]) {
        await addListItemMutation({
          mediaId: mediaIds[0],
          listId: list.id,
        });
      }
      eventEmitterCreateListWithListItemsForm.emit("submitSuccess", list);
    } catch (error) {
      eventEmitterCreateListWithListItemsForm.emit("submitError");
      throw error;
    } finally {
      eventEmitterCreateListWithListItemsForm.emit("submitSettled");
    }
  };

  return {
    ...formState,
    submit,
  };
};
