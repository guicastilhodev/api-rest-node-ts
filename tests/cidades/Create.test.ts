import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';
describe('Method: Create', () => {
  it('Should create a city and return a id', async () => {
    const res = await testServer.post('/cidades').send({ nome: 'São Paulo' });

    expect(res.statusCode).toStrictEqual(StatusCodes.CREATED);
    expect(typeof res.body).toStrictEqual('number');
  });

  it('Should not create when the city has a very short name', async () => {
    const res = await testServer.post('/cidades').send({ nome: 'CA' });

    expect(res.statusCode).toStrictEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.nome');
  });

  it('Should not create when doesn´t have the nome field', async () => {
    const res = await testServer.post('/cidades').send({});

    expect(res.statusCode).toStrictEqual(StatusCodes.BAD_REQUEST);
    expect(res.body.errors.body.nome).toStrictEqual('nome is a required field');
  });
});
