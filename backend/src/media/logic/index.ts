import axios from "axios";
import keyv from "../../common/unit-of-work/mongodb/keyv";
import { MediaLogic } from "./build";
import { unitOfWork } from "../../common/unit-of-work";

export const mediaLogic = new MediaLogic({
  axios,
  keyv,
  unitOfWork,
});
