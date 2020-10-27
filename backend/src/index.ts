import configuration from "./configuration";
import { makeExpressApp } from "./express";

const app = makeExpressApp();

app.listen(configuration.PORT, () => {
  console.info(
    `\n\nServer Listening!\nhttp://localhost:${configuration.PORT}/\n\n`
  );
});
