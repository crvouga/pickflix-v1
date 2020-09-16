import axios from 'axios';
import keyv from '../../mongodb/keyv';
import {buildTMDbLogic} from './build';

export const TMDbLogic = buildTMDbLogic({
  axios,
  keyv,
});
