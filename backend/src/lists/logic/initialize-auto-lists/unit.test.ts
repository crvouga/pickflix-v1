import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';

describe('create auto lists', () => {
  it('creates auto lists', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();
    const added = await listLogic.initializeAutoLists({user});
    const got = await listLogic.getAutoLists({ownerId: user.id});
    expect(got).toEqual(
      expect.arrayContaining(added.map(added => expect.objectContaining(added)))
    );
  });
});
