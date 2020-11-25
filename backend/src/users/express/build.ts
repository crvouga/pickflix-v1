import { IRouter } from "express";
import {
  makePaginationOptions,
  makePaginationResponse,
} from "../../common/pagination";
import { removeNullOrUndefinedEntries } from "../../common/utils";
import {
  castDisplayName,
  castEmailAddress,
  castUserId,
  castUsername,
  User,
} from "../models";
import { Dependencies } from "./types";

export const buildAuthRouter = ({ userLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.get("/auth", middlewares.isAuthenticated, async (req, res) => {
    if (req.isAuthenticated() && req.user) {
      const username = castUsername(req.user.username);
      const userAggergations = await userLogic.getUserAggergations({
        username,
      });
      const userAggergation = userAggergations[0];
      return res.status(200).json(userAggergation);
    } else {
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

  router.get("/auth/methods", async (req, res, next) => {
    try {
      const emailAddress = req.query.emailAddress as string;
      const credentialTypes = await userLogic.getCredentialTypesForEmailAddress(
        {
          emailAddress,
        }
      );
      res.status(200).json(credentialTypes);
    } catch (error) {
      next(error);
    }
  });
};

export const buildUsersRouter = ({ userLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.post("/password/forgot", async (req, res, next) => {
    try {
      const redirectUrl = req.body.redirectUrl;
      const emailAddress = req.body.emailAddress;

      await userLogic.sendResetPasswordEmail({
        emailAddress,
        redirectUrl,
      });

      res.status(201).json({ message: "Password reset email sent" });
    } catch (error) {
      next(error);
    }
  });

  router.put("/password/reset", async (req, res, next) => {
    try {
      const resetPasswordToken = req.body.resetPasswordToken as string;
      const newPassword = req.body.newPassword as string;
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
      res.status(400).json({ error, message: "failed to search users" }).end();
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

      const userAggergations = await userLogic.getUserAggergations(
        {
          id,
          username,
          emailAddress,
        },
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
      console.log(error);
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
