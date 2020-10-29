import { IRouter } from "express";
import { Dependencies } from "./types";
import { castLink } from "../logic/reset-password/email";
import { URL } from "url";

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
      console.log(error);
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
      console.log(error);
      next(error);
    }
  });

  router.get("/users", async (req, res, next) => {
    try {
      const username = req.query.username as string;
      const emailAddress = req.query.emailAddress as string;

      const [emailResults, usernameResults] = await Promise.all([
        userLogic.getUsers({ emailAddress }),
        userLogic.getUsers({ username }),
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
