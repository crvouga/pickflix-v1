import * as http from "http";
import { buildApp } from "./build";

export const startServer = async () => {
  const { app } = await buildApp();

  const PORT = Number(process.env.PORT) || 9000;
  // Fly health checks probe the machine's IPv6 address (fly-local-6pn).
  http.createServer(app).listen({ port: PORT, host: "::", ipv6Only: false }, () => {
    console.info(`\n\nServer Listening!\nhttp://localhost:${PORT}/\n\n`);
  });
};
