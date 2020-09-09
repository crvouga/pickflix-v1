import makeApp from './express';
import env from './configuration';
const main = async () => {
  const app = await makeApp();
  app.listen(env.PORT, () => {
    console.log(`Server listening on port: ${env.PORT}\n`);
  });
};

main();
