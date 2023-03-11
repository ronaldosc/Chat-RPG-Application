import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './modules/users/routes';

const app: express.Application = express();

// app.use('/', express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoutes);

const PORT = parseInt(process.env.PORT || '5000');

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
