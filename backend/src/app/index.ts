import { buildApp } from "./build";

export const startServer = async () => {
  const { app } = await buildApp();

  const PORT = Number(process.env.PORT) || 9000;
  app.listen(PORT, '0.0.0.0', () => {
    console.info(`\n\nServer Listening!\nhttp://localhost:${PORT}/\n\n`);
  });
};
