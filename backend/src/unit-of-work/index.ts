import { UnitOfWorkInMemory, UnitOfWorkDev } from "./unit-of-work.fake";
import configuration from "../configuration";

export const unitOfWork =
  configuration.NODE_ENV === "development"
    ? new UnitOfWorkDev()
    : configuration.NODE_ENV === "test"
    ? new UnitOfWorkInMemory()
    : new UnitOfWorkInMemory();
