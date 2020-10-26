import {makeUserFake} from '../../../users/models/make-user.fake';
import {buildListLogicFake} from '../build.fake';

describe('add lists', () => {
  it('adds lists', async () => {
    try {
      const {listLogic} = buildListLogicFake();
      const user = makeUserFake();
      const listInfo = {ownerId: user.id, title: 'my list'};
      const [added] = await listLogic.addLists([listInfo]);
      expect(added).toEqual(expect.objectContaining(listInfo));
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});
