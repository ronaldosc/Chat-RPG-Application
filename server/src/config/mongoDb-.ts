import mongoose, { MongooseError, set } from 'mongoose';
import { Env } from '@env';

export async function connectToMongoDB(): Promise<void> {
  set('strictQuery', false);

  await mongoose
    .connect(`${Env('MONGODB_URI')}`)
    .then(() => console.log('\x1b[33;1m', '-----> Conectado ao MongoDB <-----', '\x1b[0m\n'))
    .catch((err: MongooseError) => console.log(err));
}
