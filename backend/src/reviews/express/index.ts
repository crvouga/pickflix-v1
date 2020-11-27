import { IRouter } from "express";
import { reviewVotes } from "./review-votes";
import { reviews } from "./reviews";
import { Dependencies } from "./types";

export const useReviewsRouter = (dependencies: Dependencies) => (
  router: IRouter
) => {
  reviews(dependencies)(router);
  reviewVotes(dependencies)(router);
};
