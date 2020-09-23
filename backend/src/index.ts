import env from './configuration';
import {app} from './express';

app.listen(env.PORT, () => {
  console.log(`Server Listening! http://localhost:${env.PORT}/\n`);
});
