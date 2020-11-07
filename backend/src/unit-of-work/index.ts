import { UnitOfWorkFileSystem, UnitOfWorkHashMap } from "./unit-of-work.fake";
import configuration from "../configuration";

const getUnitOfWork = () => {
  switch (configuration.NODE_ENV) {
    case "development":
      return new UnitOfWorkFileSystem();
    case "test":
      return new UnitOfWorkHashMap();
    case "production":
      return new UnitOfWorkHashMap();
  }
};

export const unitOfWork = getUnitOfWork();
