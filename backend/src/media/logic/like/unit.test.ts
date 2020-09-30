import {buildMediaLogicFake} from '../build.fake';
import {TmdbMedia} from '../../models/types';
import {LikeStatus} from '.';

const tmdbMediaInfo: TmdbMedia = {
  tmdbMediaId: '550',
  tmdbMediaType: 'movie',
};

describe('liking stuff', () => {
  it('add and remove likes', async () => {
    const {mediaLogic} = buildMediaLogicFake();

    for (const _ of [1, 2, 3, 4, 5]) {
      await mediaLogic.addLike(tmdbMediaInfo);
      const before = await mediaLogic.isLiked(tmdbMediaInfo);

      await mediaLogic.removeLike(tmdbMediaInfo);
      const after = await mediaLogic.isLiked(tmdbMediaInfo);

      expect(before).toBe(true);
      expect(after).toBe(false);
    }
  });
  it('can like tmdb media', async () => {
    const {mediaLogic} = buildMediaLogicFake();

    for (const _ of [1, 2, 3, 4, 5]) {
      expect(await mediaLogic.toggleLike(tmdbMediaInfo)).toBe('liked');
      expect(await mediaLogic.toggleLike(tmdbMediaInfo)).toBe('not liked');
    }
  });
});
