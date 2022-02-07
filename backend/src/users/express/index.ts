import { IRouter } from "express";
import {
  makePaginationOptions,
  makePaginationResponse,
} from "../../common/pagination";
import { removeNullOrUndefinedEntries, castLink } from "../../common/utils";
import {
  castDisplayName,
  castEmailAddress,
  castUserId,
  castUsername,
  castPassword,
} from "../models";
import { Dependencies } from "./types";

export const useAuthRouter =
  ({ userLogic, middlewares }: Dependencies) =>
  (router: IRouter) => {
    router.get("/auth", async (req, res) => {
      try {
        if (req.user) {
          const username = castUsername(req.user.username);
          const userAggergations = await userLogic.getUserAggergations({
            username,
          });
          const userAggergation = userAggergations[0];
          return res.status(200).json(userAggergation);
        } else {
          return res.status(204).json(null).end();
        }
      } catch (error) {
        return res.status(204).json(null).end();
      }
    });

    router.delete("/auth", (req, res) => {
      req.logout();
      if (req.session) {
        req.session.destroy(() => {});
      }
      res.status(204).end();
    });

    router.post("/auth", middlewares.authenticate);
  };

export const useUsersRouter =
  ({ userLogic, middlewares }: Dependencies) =>
  (router: IRouter) => {
    router.post("/password/forgot", async (req, res) => {
      try {
        const redirectUrl = castLink(req.body.redirectUrl);
        const emailAddress = castEmailAddress(req.body.emailAddress);

        await userLogic.sendResetPasswordEmail({
          emailAddress,
          redirectUrl,
        });

        res.status(201).json({ message: "Password reset email sent" }).end();
      } catch (error) {
        res
          .status(500)
          .json({ message: "Something Went Wrong", error: String(error) })
          .end();
      }
    });

    router.put("/password/reset", async (req, res, next) => {
      try {
        const resetPasswordToken = req.body.resetPasswordToken as string;
        const newPassword = castPassword(req.body.newPassword);

        await userLogic.resetPassword({
          newPassword,
          resetPasswordToken,
        });
        res.status(204).json({ message: "Password was changed" }).end();
      } catch (error) {
        next(error);
      }
    });

    router.get("/search/users", async (req, res) => {
      try {
        const query = String(req.query.query);
        const page = req.query.page;

        const paginationOptions = makePaginationOptions({
          page,
        });

        const results = await userLogic.searchByUsernameAndDisplayName(
          query,
          paginationOptions
        );

        res
          .status(200)
          .json(
            makePaginationResponse({
              ...paginationOptions,
              results,
            })
          )
          .end();
      } catch (error) {
        res
          .status(400)
          .json({ error, message: "failed to search users" })
          .end();
      }
    });

    router.get("/users", async (req, res) => {
      try {
        const id = req.query.id ? castUserId(req.query.id) : undefined;

        const username = req.query.username
          ? castUsername(req.query.username)
          : undefined;

        const emailAddress = req.query.emailAddress
          ? castEmailAddress(req.query.emailAddress)
          : undefined;

        const paginationOptions = makePaginationOptions({
          page: req.query.page,
        });

        const spec = id
          ? { id }
          : username
          ? { username }
          : emailAddress
          ? { emailAddress }
          : undefined;

        if (!spec) {
          throw new Error("invalid query");
        }

        const userAggergations = await userLogic.getUserAggergations(
          spec,
          paginationOptions
        );

        res
          .status(200)
          .json(
            makePaginationResponse({
              ...paginationOptions,
              results: userAggergations,
            })
          )
          .end();
      } catch (error) {
        res.status(400).json({ message: "failed to get users", error }).end();
      }
    });

    router.post("/users/password", async (req, res, next) => {
      const emailAddress = req.body.emailAddress;
      const username = req.body.username;
      const displayName = req.body.displayName;
      const password = req.body.password;
      try {
        const user = await userLogic.createUserWithPassword({
          emailAddress,
          displayName,
          username,
          password,
        });

        req.logIn(user, (error) => {
          if (error) {
            next(error);
          } else {
            res.status(201).json(user).end();
          }
        });
      } catch (error) {
        next(error);
      }
    });

    router.patch("/users", middlewares.isAuthenticated, async (req, res) => {
      try {
        const userId = castUserId(req.user?.id);

        const username = req.body.username
          ? castUsername(req.body.username)
          : undefined;

        const displayName = req.body.displayName
          ? castDisplayName(req.body.displayName)
          : undefined;

        const emailAddress = req.body.emailAddress
          ? castEmailAddress(req.body.emailAddress)
          : undefined;

        const edits = removeNullOrUndefinedEntries({
          username,
          displayName,
          emailAddress,
        });

        const patchedUser = await userLogic.editUser({ id: userId, ...edits });
        res.status(201).json(patchedUser).end();
      } catch (error) {
        res.status(400).json({ message: "failed to edit user", error }).end();
      }
    });
  };
