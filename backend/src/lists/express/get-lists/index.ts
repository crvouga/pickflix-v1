import express from "express";
import { User } from "../../../users/models/make-user";
import { Dependencies } from "../types";

export const getLists = ({ listLogic, middlewares }: Dependencies) => (
  router: express.IRouter
) => {
  router.get("/lists", middlewares.isAuthenticated, async (req, res, next) => {
    try {
      const currentUser = req.user as User;

      const listInfo = {
        ownerId: currentUser?.id,
      };

      const lists = await listLogic.getLists(listInfo);

      res.json(lists).end();
    } catch (error) {
      next(error);
    }
  });
};
