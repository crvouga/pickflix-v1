import { UnitOfWorkFileSystem, UnitOfWorkHashMap } from "./unit-of-work.fake";
import configuration from "../../app/configuration";

const getUnitOfWork = () => {
  switch (configuration.NODE_ENV) {
    case "development":
      return new UnitOfWorkFileSystem();
    default:
      return new UnitOfWorkHashMap();
  }
};

export const unitOfWork = getUnitOfWork();
