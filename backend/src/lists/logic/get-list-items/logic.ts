import { ListId } from "../../models";
import { ListLogic } from "../build";

export async function getListItemAggergations(
  this: ListLogic,
  {
    listId,
  }: {
    listId: ListId;
  }
) {
  const listItems = await this.unitOfWork.ListItems.find({ listId });

  const aggergatedListItems = await Promise.all(
    listItems.map((listItem) => this.aggergateListItem(listItem))
  );

  return aggergatedListItems;
}
