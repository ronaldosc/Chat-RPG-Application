import express from 'express';
import { env } from 'node:process';
require('dotenv').config();

const port: number = +env.PORT;
export function App(): void {
  const app: express.Application = express();

  // app.use('/', express.static('./public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}
