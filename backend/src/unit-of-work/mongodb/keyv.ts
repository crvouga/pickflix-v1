import Keyv from "keyv";
import config from "../../configuration";

const keyv = new Keyv(config.MONGODB_CONNECTION_URI);
keyv.on("error", (err) => {
  throw err;
});

export default keyv;
