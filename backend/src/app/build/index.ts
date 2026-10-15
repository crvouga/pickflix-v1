import { getNodeEnv } from "../../config";
import { buildAppDevelopment } from "./build-development";
import { buildAppProduction } from "./build-production";
import { buildAppTest } from "./build-test";

export const buildApp = () => {
  switch (getNodeEnv()) {
    case "production":
      return buildAppProduction();

    case "development":
      return buildAppDevelopment();

    case "test":
      return buildAppTest();

    default:
      throw new Error("unsupported case");
  }
};
