import {ReviewLogic} from './build';
import {unitOfWork} from '../../unit-of-work';

export const reviewLogic = new ReviewLogic({unitOfWork});
