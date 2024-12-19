import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Method: UpdateById', () => {
  it('Should update by id', async () => {
    const res = await testServer.post('/cidades').send({ nome: 'São Paulo' });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer.put(`/cidades/${res.body}`).send({ nome: 'Rio de Janeiro' });

    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Should not update if the city doesn´t exist', async () => {
    const res1 = await testServer.put('/cidades/99999').send({ nome: 'São Paulo' });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
