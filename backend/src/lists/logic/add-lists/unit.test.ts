import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';
import {TmdbMediaType, TmdbMedia} from '../../../media/models/types';

describe('add lists', () => {
  it('adds lists', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();
    const listInfo = {ownerId: user.id, title: 'my list'};
    const [added] = await listLogic.addLists([listInfo]);
    expect(added).toEqual(expect.objectContaining(listInfo));
  });
});
