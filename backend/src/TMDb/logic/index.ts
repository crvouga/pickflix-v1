import axios from 'axios';
import keyv from '../../unit-of-work/mongodb/keyv';
import {buildTMDbLogic} from './build';

export const TMDbLogic = buildTMDbLogic({
  axios,
  keyv,
});
