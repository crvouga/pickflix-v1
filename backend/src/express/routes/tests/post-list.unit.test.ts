import supertest from 'supertest';
import {build} from './build';

describe('POST /lists', () => {
  it('responses with created list', async done => {
    const {currentUser, app} = build();

    const listInfo = {
      title: 'my movies',
      description: 'some cool movies',
    };

    supertest(app)
      .post('/lists')
      .send(listInfo)
      .set('Accept', 'application/json')
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject({
          title: listInfo.title,
          description: listInfo.description,
          userIds: [currentUser.id],
        });
        done();
      });
  });

  it.todo('responses with bad request');
});
