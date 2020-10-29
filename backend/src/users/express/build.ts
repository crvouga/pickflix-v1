import { IRouter } from "express";
import { Dependencies } from "./types";
import { castLink } from "../logic/reset-password/reset-password-email";

export const buildAuthRouter = ({ userLogic, middlewares }: Dependencies) => (
  router: IRouter
) => {
  router.get("/auth", middlewares.isAuthenticated, (req, res) => {
    res.status(200).json(req.user);
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
      const emailAddress = req.query.email as string;
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
  router.post("/passwords/forgot", async (req, res, next) => {
    try {
      const resetPasswordLink = req.query.resetPasswordLink as string;
      const emailAddress = req.query.emailAddress as string;

      const tokenToLink = (token: string) => {
        const url = new URL(resetPasswordLink);
        url.searchParams.append("token", token);
        return castLink(url.toString());
      };

      await userLogic.sendResetPasswordEmail({
        emailAddress,
        tokenToLink,
      });

      res.status(201).json({ message: "Password reset email sent" });
    } catch (error) {
      next(error);
    }
  });

  router.post("/passwords/reset", async (req, res, next) => {});

  router.get("/users", async (req, res, next) => {
    try {
      const username = req.query.username as string;
      const emailAddress = req.query.emailAddress as string;

      const [emailResults, usernameResults] = await Promise.all([
        userLogic.findUsers({ emailAddress }),
        userLogic.findUsers({ username }),
      ]);

      const users = [...emailResults, ...usernameResults];
      return res.status(200).json(users).end();
    } catch (error) {
      return next(error);
    }
  });

  router.get(
    "/users/current",
    middlewares.isAuthenticated,
    async (req, res) => {
      res.status(200).json(req.user);
    }
  );

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
};
