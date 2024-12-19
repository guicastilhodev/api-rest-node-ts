import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Method: GetById', () => {
  it('Should get by id', async () => {
    const res = await testServer.post('/cidades').send({ nome: 'São Paulo' });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/cidades/${res.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');
  });
  it('Tenta buscar registro que não existe', async () => {
    const res1 = await testServer.get('/cidades/99999').send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
