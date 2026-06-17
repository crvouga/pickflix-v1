import { buildApp } from "./build";

export const startServer = async () => {
  const { app } = await buildApp();

  const PORT = Number(process.env.PORT) || 9000;
  // Fly health checks probe the machine's IPv6 address — binding only to
  // 0.0.0.0 makes checks fail with "connection refused" and the LB returns 503.
  app.listen(PORT, () => {
    console.info(`\n\nServer Listening!\nhttp://localhost:${PORT}/\n\n`);
  });
};
