import { ListLogic } from "../../lists/logic/logic";
import { MediaLogic } from "../../media/logic/logic";
import { ReviewLogic } from "../../reviews/logic/logic";
import { UserLogic } from "../../users/logic/logic";
import {
  AuthenticateMiddleware,
  IsAuthenticatedMiddleware,
} from "./authentication-middleware";
import { IPostgresDatabase } from "../data-store/repository/postgres/database.postgres";

export type ExpressAppDependencies = {
  postgresDatabase: IPostgresDatabase;
  listLogic: ListLogic;
  reviewLogic: ReviewLogic;
  mediaLogic: MediaLogic;
  userLogic: UserLogic;
  middlewares: {
    authenticate: AuthenticateMiddleware;
    isAuthenticated: IsAuthenticatedMiddleware;
  };
};
