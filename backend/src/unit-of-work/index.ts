import { UnitOfWorkDev, UnitOfWorkInMemory } from "./unit-of-work.fake";
import configuration from "../configuration";

const getUnitOfWork = () => {
  switch (configuration.NODE_ENV) {
    case "development":
      return new UnitOfWorkDev();
    case "test":
      return new UnitOfWorkInMemory();
    case "production":
      return new UnitOfWorkInMemory();
  }
};

export const unitOfWork = getUnitOfWork();
