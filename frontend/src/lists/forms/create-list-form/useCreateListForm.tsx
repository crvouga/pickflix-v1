import { useQueryCache } from "react-query";
import { createEventEmitter } from "../../../utils";
import {
  List,
  postList,
  postListItem,
  useCreateListMutation,
  useAddListItemMutation,
} from "../../query";
import { useCreateListFormState } from "./create-list-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: List;
  submitError: undefined;
}>();

export default () => {
  const formState = useCreateListFormState();
  const [createListMutation] = useCreateListMutation();
  const [addListItemMutation] = useAddListItemMutation();
  const { mediaIds, title } = formState;

  const submit = async () => {
    eventEmitter.emit("submit");
    try {
      const list = await createListMutation({
        title,
        description: "",
      });

      if (list && mediaIds[0]) {
        await addListItemMutation({
          mediaId: mediaIds[0],
          listId: list.id,
        });
      }
      eventEmitter.emit("submitSuccess", list);
    } catch (error) {
      eventEmitter.emit("submitError");
      throw error;
    }
  };

  return {
    ...formState,
    submit,
    eventEmitter,
  };
};
