import Keyv from 'keyv';
import config from '../configuration';

const keyv = new Keyv(config.mongoDbConnectionURI);
keyv.on('error', err => {
  console.log('mongodb connection Error', err);
});

export default keyv;
