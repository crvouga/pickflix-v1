import express, { Handler } from "express";
import { buildListLogicFake } from "../lists/logic/build.fake";
import { buildMediaLogicFake } from "../media/logic/build.fake";
import { buildReviewLogicFake } from "../reviews/logic/build.fake";
import { buildUserLogicFake } from "../users/logic/user-logic.fake";
import { makeUserFake } from "../users/models/make-user.fake";
import { buildExpressApp } from "./build-express-app";
import { ExpressAppDependencies } from "./types";
import { UnitOfWorkHashMap } from "../unit-of-work/unit-of-work.fake";

export const buildExpressAppFake = async () => {
  const unitOfWork = new UnitOfWorkHashMap();
  const { userLogic } = buildUserLogicFake({ unitOfWork });
  const { listLogic } = buildListLogicFake({ unitOfWork });
  const { reviewLogic } = buildReviewLogicFake({ unitOfWork });
  const { mediaLogic } = buildMediaLogicFake();

  const user = makeUserFake();

  await unitOfWork.Users.add([user]);

  //@ts-ignore
  const stub: Handler = (req, res, next) => {
    req.user = user;
    next();
  };

  const dependenciesFake: ExpressAppDependencies = {
    listLogic,
    userLogic,
    mediaLogic,
    reviewLogic,
    middlewares: {
      authenticate: stub,
      isAuthenticated: stub,
    },
  };

  const app = express();

  buildExpressApp(dependenciesFake)(app);

  return {
    ...dependenciesFake,
    user,
    app,
  };
};
