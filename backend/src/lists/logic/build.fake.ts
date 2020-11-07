import { buildMediaLogicFake } from "../../media/logic/build.fake";
import { UnitOfWorkHashMap } from "../../unit-of-work/unit-of-work.fake";
import { ListLogic } from "./build";

export const buildListLogicFake = () => {
  const { mediaLogic } = buildMediaLogicFake();
  const listLogic = new ListLogic({
    mediaLogic,
    unitOfWork: new UnitOfWorkHashMap(),
  });

  return { listLogic };
};
