import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';
import {makeUser} from '../../users/models';
import {buildListLogic} from '../logic/logic';
import {makeList} from '../models';
import {buildListItemStorage} from '../storage/list-item-storage.fake';
import {buildListStorage} from '../storage/list-storage.fake';
import {buildListHandlers} from './handlers';
import {buildListRouter} from './router';

export const build = () => {
  const ListLogic = buildListLogic({
    ListItemStorage: buildListItemStorage(),
    ListStorage: buildListStorage(),
  });

  const currentUser = makeUser({
    firebaseId: '1234567890',
  });

  const attachCurrentUser: express.Handler = (req, res, next) => {
    req.currentUser = currentUser;
    next();
  };

  const ListHandlers = buildListHandlers({
    ListLogic,
  });

  const ListRouter = buildListRouter({
    attachCurrentUser,
    ListHandlers,
  });

  const app = express();
  app.use(bodyParser.json());
  app.use('', ListRouter);

  return {
    ListLogic,
    currentUser,
    app,
  };
};

describe('DELETE /lists/:listId', () => {
  it('deletes list', async done => {
    const {app, ListLogic, currentUser} = build();

    const list = await ListLogic.createList({
      userIds: [currentUser.id],
      title: 'my movies',
      description: 'some cool movies',
    });

    supertest(app)
      .delete(`/lists/${list.id}`)
      .expect(200)
      .then(response => {
        done();
      });
  });
});

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
});

describe('GET /lists/:listId', () => {
  it('sends a list with items', async done => {
    const {ListLogic, currentUser, app} = build();

    const list = await ListLogic.createList({
      userIds: [currentUser.id],
      title: 'my list',
      description: 'my description',
    });

    const listItems = await Promise.all(
      [1, 2, 3, 4, 5].map(n =>
        ListLogic.addItem({
          listId: list.id,
          tmdbMediaType: 'movie',
          tmdbId: `${n}`,
        })
      )
    );

    const expected = {
      id: list.id,
      userIds: list.userIds,
      title: list.title,
      description: list.description,
      items: {
        results: listItems,
      },
    };

    supertest(app)
      .get(`/lists/${list.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(expected);
        done();
      });
  });
});

describe('GET /lists', () => {
  it('gets lists for current user', async done => {
    const {ListLogic, currentUser, app} = build();

    const lists = await Promise.all(
      [1, 2, 3, 4, 5].map(n =>
        ListLogic.createList({
          userIds: [currentUser.id],
          title: 'my movies 1',
          description: 'some cool movies...',
        })
      )
    );

    supertest(app)
      .get('/lists')
      .expect(200)
      .then(response => {
        expect(response.body.results).toStrictEqual(lists);
      });

    done();
  });
});

describe('POST /lists', () => {
  it('responses with created list', async done => {
    const {currentUser, app} = build();

    const title = 'my movies';
    const description = 'some cool movies';

    supertest(app)
      .post('/lists')
      .send({title, description})
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, response) => {
        expect(response.body).toMatchObject({
          title,
          description,
          userIds: [currentUser.id],
        });
        done();
      });
  });

  it.todo('responses with bad request');
});

describe('POST /lists/:listId/items', () => {
  it('adds item to list', async done => {
    const {currentUser, app} = build();

    const list = makeList({
      userIds: [currentUser.id],
      title: 'my list',
    });

    supertest(app)
      .post(`/lists/${list.id}/items`)
      .send({
        tmdbId: 42,
        tmdbMediaType: 'movie',
      })
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject({
          tmdbId: 42,
          tmdbMediaType: 'movie',
        });
        done();
      });
  });
});
