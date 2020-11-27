import { buildAppDevelopment } from "./build/build-development";
import { buildAppProduction } from "./build/build-production";
import configuration from "./configuration";

const buildAppSwitch = () => {
  switch (configuration.NODE_ENV) {
    case "production":
      return buildAppProduction();
    default:
      return buildAppDevelopment();
  }
};

export const startServer = async () => {
  const { app } = await buildAppSwitch();

  app.listen(configuration.PORT, () => {
    console.info(
      `\n\nServer Listening!\nhttp://localhost:${configuration.PORT}/\n\n`
    );
  });
};
