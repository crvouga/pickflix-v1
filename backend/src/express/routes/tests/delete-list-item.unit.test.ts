import supertest from 'supertest';
import {build} from './build';

describe('DELETE /lists/:listId/items/:itemId', () => {
  it('deletes list item', async done => {
    const {app, currentUser} = build();

    const agent = supertest(app);

    const {body: list} = await agent
      .post('/list')
      .send({title: 'my movies', description: 'some cool movies'});

    const {body: listItem} = await agent.post(`/list/${list.id}/items`).send({
      tmdbId: '42',
      tmdbMediaType: 'movie',
    });

    await agent
      .delete(`/lists/${list.id}/items/${listItem.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({});
      });
    done();
  });

  // it('fails when item does not exist', async done => {
  //   const {app, currentUser} = build();

  //   const agent = supertest(app);

  //   const {body: list} = await agent
  //     .post('/list')
  //     .send({title: 'my movies', description: 'some cool movies'});

  //   const listItemId = '42';
  //   await agent.delete(`/lists/${list.id}/items/${listItemId}`).expect(404);
  //   done();
  // });
});
