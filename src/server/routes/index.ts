import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/teste', (req, res) => {
  res.send('Hello world!');
});

router.post('/teste', (req, res) => {
  console.log(req.body);

  res.status(StatusCodes.UNAUTHORIZED).json(req.body);
});

export { router };
