import { List, makeList, PartialList } from "../../models";
import { ListLogic } from "../build";

export async function addLists(
  this: ListLogic,
  listInfos: PartialList[]
): Promise<List[]> {
  const {
    unitOfWork: { Lists },
  } = this;

  const lists = listInfos.map((listInfo) => makeList(listInfo));
  const added = await Lists.add(lists);

  return added;
}
