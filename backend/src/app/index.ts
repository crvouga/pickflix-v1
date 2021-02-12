import { buildApp } from "./build";

export const startServer = async () => {
  const { app } = await buildApp();

  const PORT = process.env.PORT || "5000";
  app.listen(PORT, () => {
    console.info(`\n\nServer Listening!\nhttp://localhost:${PORT}/\n\n`);
  });
};
