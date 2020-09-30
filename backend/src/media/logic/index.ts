import axios from 'axios';
import keyv from '../../unit-of-work/mongodb/keyv';
import {MediaLogic} from './build';
import {unitOfWork} from '../../unit-of-work';

export const mediaLogic = new MediaLogic({
  axios,
  keyv,
  unitOfWork,
});
