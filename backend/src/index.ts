import {makeExpressApp} from './express';
import env from './configuration';

const main = async () => {
  const expressApp = makeExpressApp();
  expressApp.listen(env.PORT, () => {
    console.log(
      `======================================\n\nServer listening on port: ${env.PORT}\n\n======================================`
    );
  });
};

main();
