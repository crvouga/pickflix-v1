import axios from 'axios';
import keyv from '../../unit-of-work/mongodb/keyv';
import {TmdbLogic} from './build';

export const tmdbLogic = new TmdbLogic({
  axios,
  keyv,
});
