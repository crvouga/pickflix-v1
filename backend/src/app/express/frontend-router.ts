import express, { Application } from "express";
import path from "path";

const FRONTEND_BUILD_PATH = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "frontend",
  "dist"
);

export const useFrontendRouter = () => async (app: Application) => {
  app.use(express.static(FRONTEND_BUILD_PATH, { maxAge: "30d" }));

  app.get("*", (req, res) => {
    res.sendFile(path.join(FRONTEND_BUILD_PATH, "index.html"));
  });
};
