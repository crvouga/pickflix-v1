// import session from "express-session";
import session from "express-session";
import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import {
  AuthenticateMiddleware,
  IsAuthenticatedMiddleware,
} from "./authentication-middleware";

export type ExpressAppDependencies = {
  sessionStore?: session.SessionOptions["store"];
  listLogic: ListLogic;
  reviewLogic: ReviewLogic;
  mediaLogic: MediaLogic;
  userLogic: UserLogic;
  middlewares: {
    authenticate: AuthenticateMiddleware;
    isAuthenticated: IsAuthenticatedMiddleware;
  };
};
