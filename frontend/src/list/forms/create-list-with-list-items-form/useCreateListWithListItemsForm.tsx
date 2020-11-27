import { createEventEmitter } from "../../../common/utility";
import { MediaId } from "../../../media/tmdb/types";
import {
  List,
  useAddListItemMutation,
  useCreateListMutation,
} from "../../query";
import { useFormState } from "./create-list-with-list-items-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: List;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const formState = useFormState();
  const createListMutation = useCreateListMutation();
  const addListItemMutation = useAddListItemMutation();

  const submit = async ({
    title,
    mediaIds,
  }: {
    mediaIds: MediaId[];
    title: string;
  }) => {
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
    } finally {
      eventEmitter.emit("submitSettled");
    }
  };

  return {
    ...formState,
    submit,
    eventEmitter,
  };
};
