import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';
describe('Method: DeleteById', () => {
  it('Should delete and return a id', async () => {
    const res = await testServer.post('/cidades').send({ nome: 'São Paulo' });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer.delete(`/cidades/${res.body}`).send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should not delete when the param is not a number', async () => {
    const id = 'hello world';
    const res = await testServer.delete(`/cidades/${id}`);

    expect(res.statusCode).toStrictEqual(StatusCodes.BAD_REQUEST);
    expect(res.body.errors.params.id).toContain('id must be a `number` type, but the final value was');
  });

  it('Should not delete when the param is less than 0', async () => {
    const id = 0;
    const res = await testServer.delete(`/cidades/${id}`);

    expect(res.statusCode).toStrictEqual(StatusCodes.BAD_REQUEST);
    expect(res.body.errors.params.id).toStrictEqual('id must be greater than 0');
  });
  it('Should not delete when the city doesn´t exist', async () => {
    const id = 99999;
    const res = await testServer.delete(`/cidades/${id}`);

    expect(res.statusCode).toStrictEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
