import mongoose, { MongooseError, set } from 'mongoose';
import { env } from 'node:process';

const db = mongoose;

const mongoUser = env.MONGO_INITDB_ROOT_USERNAME;
const mongoPassword = env.MONGO_INITDB_ROOT_PASSWORD;
const mongoPort = +env.MONGO_PORT;

export async function connectToMongoDB(): Promise<void> {
  set('strictQuery', false);

  await db
    .connect(`mongodb://${mongoUser}:${mongoPassword}@mongo-rpg:${mongoPort}`)
    .then(() => console.log('\x1b[33;1m', '-----> Conectado ao MongoDB <-----', '\x1b[0m\n'))
    .catch((err: MongooseError) => console.log(err));
}
