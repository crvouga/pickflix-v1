import {UnitOfWorkFake} from '../../unit-of-work/unit-of-work.fake';
import {buildListLogic} from './build';

export const buildListLogicFake = () => {
  const ListLogic = buildListLogic({
    TMDbLogic: {
      request: async () => ({}),
      append: async x => ({
        ...x,
        tmdbData: {},
        tmdbMediaId: '550',
        tmdbMediaType: 'movie',
      }),
    },
    unitOfWork: new UnitOfWorkFake(),
  });
  return {ListLogic};
};
