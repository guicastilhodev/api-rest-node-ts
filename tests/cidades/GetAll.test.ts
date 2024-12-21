import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Method: GetAll', () => {
  it('Should get all cities in the page', async () => {
    const res = await testServer.get(`/cidades`);

    expect(Number(res.header['x-total-count'])).toBeGreaterThan(0);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.statusCode).toStrictEqual(StatusCodes.OK);
  });

  it('Should get all cities in the specified page', async () => {
    const page = 10;
    const res = await testServer.get('/cidades').query({ page: page });

    expect(res.statusCode).toStrictEqual(StatusCodes.OK);
    expect(res.body).toStrictEqual([
      {
        id: 1,
        nome: 'São Paulo',
      },
    ]);
  });

  it('Should return a error if the query params are less than 0', async () => {
    const page = -10;
    const filter = '';
    const limit = -1;
    const res = await testServer.get('/cidades').query({ page: page, filter: filter, limit: limit });

    expect(res.statusCode).toStrictEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.query');
    expect(res.body).toHaveProperty('errors.query.limit');
    expect(res.body).toHaveProperty('errors.query.page');
    expect(res.body).toHaveProperty('errors.query.filter');
  });
});
