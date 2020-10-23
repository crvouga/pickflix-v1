import {buildExpressAppFake} from '../../express/build.fake';
import supertest from 'supertest';

describe('/api/auth', () => {
  it('GET /api/auth/credentials', async () => {
    const {app} = await buildExpressAppFake();

    const response = await supertest(app)
      .get('/api/auth/credentials')
      .query({email: 'test@gmail.com'})
      .expect(200);

    expect(response.body).toHaveLength(0);
  });
});
