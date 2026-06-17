import * as http from "http";
import { buildApp } from "./build";

export const startServer = async () => {
  const { app } = await buildApp();

  const PORT = Number(process.env.PORT) || 9000;
  const HOST = process.env.HOST ?? "0.0.0.0";
  http.createServer(app).listen(PORT, HOST, () => {
    console.info(`Server listening on http://${HOST}:${PORT}/`);
  });
};
