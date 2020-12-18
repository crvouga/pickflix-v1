import { getNodeEnv } from "../config";
import { buildAppDevelopment } from "./build/build-development";
import { buildAppProduction } from "./build/build-production";

const buildAppSwitch = () => {
  switch (getNodeEnv()) {
    case "production":
      return buildAppProduction();

    case "development":
      return buildAppDevelopment();

    default:
      throw new Error("unsupported case");
  }
};

export const startServer = async () => {
  const { app } = await buildAppSwitch();

  const PORT = process.env.PORT || "5000";
  app.listen(PORT, () => {
    console.info(`\n\nServer Listening!\nhttp://localhost:${PORT}/\n\n`);
  });
};
