import { getNodeEnv } from "../../config";
import { buildAppDevelopment } from "./build-development";
import { buildAppTest } from "./build-test";

export const buildApp = () => {
  switch (getNodeEnv()) {
    case "production":
      return buildAppDevelopment();
    // return buildAppProduction();

    case "development":
      return buildAppDevelopment();

    case "test":
      return buildAppTest();

    default:
      throw new Error("unsupported case");
  }
};
