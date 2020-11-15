import { buildMediaLogicFake } from "../../media/logic/build.fake";
import { UnitOfWorkHashMap } from "../../unit-of-work/unit-of-work.fake";
import { ListLogic } from "./build";

export const buildListLogicFake = ({
  unitOfWork = new UnitOfWorkHashMap(),
} = {}) => {
  const { mediaLogic } = buildMediaLogicFake();
  const listLogic = new ListLogic({
    mediaLogic,
    unitOfWork,
  });

  return { listLogic };
};
