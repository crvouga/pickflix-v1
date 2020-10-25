import env from './configuration';
import {app} from './express';

app.listen(env.PORT, () => {
  console.log(`\nServer Listening! http://localhost:${env.PORT}/\n`);
});
