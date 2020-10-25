import configuration from '../configuration';
import cors from 'cors';
import url from 'url';

const env = process.env.NODE_ENV || 'development';

export default () =>
  cors({
    origin: true,
    credentials: true,
    // origin: (origin, callback) => {
    //   /** allow access if in dev env */
    //   if (env === 'development') {
    //     return callback(null, true);
    //   }

    //   /** Assuming an undefined origin is from a browser then allow access if origin is from a browser */
    //   if (origin === undefined) {
    //     return callback(null, true);
    //   }

    //   try {
    //     const originHostname = new url.URL(origin || '').hostname;
    //     const clientHostname = new url.URL(configuration.clientOrigin).hostname;
    //     if (originHostname === clientHostname) {
    //       return callback(null, true);
    //     }
    //   } catch (error) {
    //     return callback(error);
    //   }

    //   return callback(new Error('blocked by cors policy'));
    // },
  });
