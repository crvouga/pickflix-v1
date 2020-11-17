import { useQueryCache } from "react-query";
import { createEventEmitter } from "../../../utils";
import { List, postList, postListItem } from "../../query";
import { useCreateListFormState } from "./create-list-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: List;
}>();

export default () => {
  const queryCache = useQueryCache();
  const addListFormState = useCreateListFormState();
  const { mediaIds, title } = addListFormState;

  const submit = async () => {
    eventEmitter.emit("submit");
    try {
      const list = await postList({
        title,
        description: "",
      });

      if (mediaIds[0]) {
        await postListItem({
          mediaId: mediaIds[0],
          listId: list.id,
        });
      }
      eventEmitter.emit("submitSuccess", list);
    } catch (error) {
      throw error;
    } finally {
      queryCache.invalidateQueries((query) => query.queryKey.includes("lists"));
    }
  };

  return {
    ...addListFormState,
    submit,
    eventEmitter,
  };
};
