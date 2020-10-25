import fs from 'fs';
import https from 'https';
import configuration from './configuration';
import {makeExpressApp} from './express';

const makeStoreDirs = () => {
  if (!fs.existsSync(configuration.storePath)) {
    fs.mkdirSync(configuration.storePath);
    fs.mkdirSync(configuration.sessionStorePath);
  }
};

const makeHttpsLocalhostCert = () => {
  const key = fs.readFileSync('localhost-key.pem', 'utf-8');
  const cert = fs.readFileSync('localhost.pem', 'utf-8');
  return {
    key,
    cert,
  };
};

const makeServer = () => {
  const app = makeExpressApp();

  if (configuration.env === 'development') {
    makeStoreDirs();
    const {key, cert} = makeHttpsLocalhostCert();
    const server = https.createServer({key, cert}, app);
    return server;
  }

  return app;
};

const server = makeServer();

server.listen(configuration.PORT, () => {
  console.log(
    `\n\nServer Listening! https://localhost:${configuration.PORT}/\n\n`
  );
});
