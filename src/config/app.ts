import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

export function App() {
  const app: express.Application = express();

  // app.use('/', express.static('./public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  function listen(port: number): void {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }

  return {
    listen,
  };
}
