import { List, makeList } from "../../models";
import { ListLogic } from "../build";

export async function editLists(
  this: ListLogic,
  listInfos: Array<Partial<List> & Pick<List, "id">>
): Promise<List[]> {
  try {
    await this.unitOfWork.begin();

    const editedLists = [];

    for (const { id, ...listInfo } of listInfos) {
      const foundLists = await this.unitOfWork.Lists.find({ id });

      if (foundLists.length === 0) {
        throw new Error("try to edit list that does not exists");
      }

      const existingList = foundLists[0];

      const editedList = makeList({
        ...existingList,
        ...listInfo,
      });

      await this.unitOfWork.Lists.update([editedList]);

      editedLists.push(editedList);
    }

    await this.unitOfWork.commit();

    return editedLists;
  } catch (error) {
    await this.unitOfWork.rollback();
    throw error;
  }
}
