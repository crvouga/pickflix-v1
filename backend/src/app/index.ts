import { buildAppDevelopment } from "./build/build-development";
import { buildAppProduction } from "./build/build-production";
import configuration from "./configuration";

const buildAppSwitch = () => {
  switch (configuration.NODE_ENV) {
    case "production":
      console.log("using production build");
      return buildAppProduction();
    default:
      console.log("using development build");
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
