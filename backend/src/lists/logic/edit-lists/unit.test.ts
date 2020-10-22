import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';

describe('editing list', () => {
  it('rejects invalid edits', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();
    const [added] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: 'hello',
      },
    ]);

    expect(
      listLogic.editLists([
        {
          id: added.id,
          title: '',
        },
      ])
    ).rejects.toBeTruthy();
  });
});
