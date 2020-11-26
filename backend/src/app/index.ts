import sgMail from "@sendgrid/mail";
import { buildEventEmitter } from "../common/events/build";
import { listLogic } from "../lists/logic";
import { mediaLogic } from "../media/logic";
import { buildReviewLogicProduction } from "../reviews/logic/build";
import { buildEmailLogicProduction } from "../users/email";
import {
  authenticate,
  isAuthenticated,
} from "../users/express/build-auth-middleware";
import { buildUserLogicProduction } from "../users/logic/build";
import configuration from "./configuration";
import { buildExpressApp } from "./express/build-express-app";
import { ExpressAppDependencies } from "./express/types";

const eventEmitter = buildEventEmitter({
  listLogic,
});

export const dependencies: ExpressAppDependencies = {
  listLogic,
  userLogic: buildUserLogicProduction({
    eventEmitter,
    emailLogic: buildEmailLogicProduction({
      emailService: sgMail,
    }),
  }),
  mediaLogic,
  reviewLogic: buildReviewLogicProduction({ mediaLogic }),
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
