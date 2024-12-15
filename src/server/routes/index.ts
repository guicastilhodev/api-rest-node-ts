import { Router } from 'express';

import { CidadesController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  res.send('Hello world!');
});

router.post(
  '/cidades',
  CidadesController.createValidation,
  CidadesController.create,
);

export { router };
