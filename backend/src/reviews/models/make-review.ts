import {Id} from '../../id/types';
import {makeId} from '../../id';

export const makeReview = ({
  id = makeId(),
  content,
}: {
  id?: Id;
  authorId: Id;
  content: string;
  createdAt: Date;
}) => {
  if (content.length === 0) {
    throw new Error('content can not be empty');
  }
  return Object.freeze({});
};
