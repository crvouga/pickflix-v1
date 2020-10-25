import fs from 'fs';
import https from 'https';
import configuration from './configuration';
import {app} from './express';

if (!fs.existsSync(configuration.storePath)) {
  fs.mkdirSync(configuration.storePath);
  fs.mkdirSync(configuration.sessionStorePath);
}

const key = fs.readFileSync('localhost-key.pem', 'utf-8');
const cert = fs.readFileSync('localhost.pem', 'utf-8');

const server = https.createServer({key, cert}, app);

server.listen(configuration.PORT, () => {
  console.log(
    `\n\nServer Listening! https://localhost:${configuration.PORT}/\n\n`
  );
});
