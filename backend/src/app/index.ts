import { listLogic } from "../lists/logic";
import { mediaLogic } from "../media/logic";
import { reviewLogic } from "../reviews/logic";
import {
  authenticate,
  isAuthenticated,
} from "../users/express/build-auth-middleware";
import { userLogic } from "../users/logic";
import configuration from "./configuration";
import { buildExpressApp } from "./express/build-express-app";
import { ExpressAppDependencies } from "./express/types";

export const dependencies: ExpressAppDependencies = {
  listLogic,
  userLogic,
  mediaLogic,
  reviewLogic,
  middlewares: {
    authenticate,
    isAuthenticated,
  },
};

export const startServer = () => {
  const app = buildExpressApp(dependencies);

  app.listen(configuration.PORT, () => {
    console.info(
      `\n\nServer Listening!\nhttp://localhost:${configuration.PORT}/\n\n`
    );
  });
};
