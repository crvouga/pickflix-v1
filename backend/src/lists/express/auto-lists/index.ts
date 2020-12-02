import { IRouter } from "express";
import { castUserId } from "../../../users/models";
import { castAutoListId } from "../../models";
import { Dependencies } from "../types";
import { castMediaId } from "../../../media/models/types";

export const autoLists = ({ listLogic }: Dependencies) => (router: IRouter) => {
  /* 
    
    NOTE: list id take presedence over owner id 

  */
  router.get("/auto-lists", async (req, res) => {
    try {
      const id = req.query.id ? castAutoListId(req.query.id) : undefined;

      const ownerId = req.query.ownerId
        ? castUserId(req.query.ownerId)
        : req.user
        ? castUserId(req.user.id)
        : undefined;

      const includeListItemWithMediaId =
        req.query.tmdbMediaId && req.query.tmdbMediaType
          ? castMediaId({
              tmdbMediaId: req.query.tmdbMediaId,
              tmdbMediaType: req.query.tmdbMediaType,
            })
          : undefined;

      const listInfo = id ? { id } : { ownerId };

      const autoLists = await listLogic.getAutoListAggergations(listInfo, {
        includeListItemWithMediaId,
      });

      res.status(200).json(autoLists).end();
    } catch (error) {
      res.status(400).json({ error }).end();
    }
  });
};
