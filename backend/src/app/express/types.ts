import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import {
  AuthenticateMiddleware,
  IsAuthenticatedMiddleware,
} from "./authentication-middleware";
import { UserLogic } from "../../users/logic/logic";

export type ExpressAppDependencies = {
  listLogic: ListLogic;
  reviewLogic: ReviewLogic;
  mediaLogic: MediaLogic;
  userLogic: UserLogic;
  middlewares: {
    authenticate: AuthenticateMiddleware;
    isAuthenticated: IsAuthenticatedMiddleware;
  };
};
