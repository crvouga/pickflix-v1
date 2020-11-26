import { Handler } from "express";
import { UnitOfWorkHashMap } from "../../common/unit-of-work/unit-of-work.fake";
import { buildListLogicFake } from "../../lists/logic/build.fake";
import { buildMediaLogicFake } from "../../media/logic/build.fake";
import { buildReviewLogicTest } from "../../reviews/logic/build";
import { buildUserLogicFake } from "../../users/logic/build";
import { makeUserFake } from "../../users/models/make-user.fake";
import { buildExpressApp } from "./build-express-app";
import { ExpressAppDependencies } from "./types";

export const buildExpressAppFake = async () => {
  const unitOfWork = new UnitOfWorkHashMap();
  const { userLogic } = buildUserLogicFake({ unitOfWork });
  const { listLogic } = buildListLogicFake({ unitOfWork });
  const { reviewLogic } = buildReviewLogicTest();
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

  const app = buildExpressApp(dependenciesFake);

  return {
    ...dependenciesFake,
    user,
    app,
  };
};
