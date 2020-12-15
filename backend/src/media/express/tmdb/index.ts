import express, { IRouter } from "express";
import { Dependencies } from "../types";
import { castUserId } from "../../../users/models";
import { serializeJson, castNonEmptyString, castJson } from "../../../utils";
import { castTmdbDiscoverTagsId } from "../../models/tmdb-discover-tags";
import {
  makePaginationOptions,
  makePaginationResponse,
} from "../../../app/pagination";

export const tmdb = ({ middlewares, mediaLogic }: Dependencies) => (
  router: IRouter
) => {
  router.use(
    "/tmdb",
    express
      .Router()

      .all("*", async (req, res, next) => {
        try {
          const path = req.path as string;
          const query = req.query as { [key: string]: string };
          const data = await mediaLogic.requestTmdbData({ path, query });
          res.json(data);
        } catch (error) {
          next(error);
        }
      })
  );

  router.get(
    "/media/tmdb/discover/tags",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const userId = castUserId(req.user?.id);

        const paginationOptions = makePaginationOptions({
          page: req.query.page,
        });

        const tmdbDiscoverTags = await mediaLogic.getTmdbDiscoverTags(
          {
            userId,
          },
          paginationOptions
        );

        const response = makePaginationResponse({
          results: tmdbDiscoverTags,
          ...paginationOptions,
        });

        res.status(200).json(response).end();
      } catch (error) {
        res.status(400).json({ error: error.toString() });
      }
    }
  );

  router.post(
    "/media/tmdb/discover/tags",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const userId = castUserId(req.user?.id);

        const key = castNonEmptyString(req.body.key);

        const tagsById = castJson(JSON.stringify(req.body.tagsById));

        await mediaLogic.addTmdbDiscoverTags({
          userId,
          key,
          tagsById,
        });

        res.status(201).end();
      } catch (error) {
        res.status(400).json({ error: error.toString() });
      }
    }
  );

  router.delete(
    "/media/tmdb/discover/tags/:id",
    middlewares.isAuthenticated,
    async (req, res) => {
      try {
        const userId = castUserId(req.user?.id);
        const id = castTmdbDiscoverTagsId(req.params.id);

        await mediaLogic.removeTmdbDiscoverTags({
          id,
          userId,
        });

        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: error.toString() });
      }
    }
  );
};
