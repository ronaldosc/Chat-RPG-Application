import mongoose, { MongooseError, set } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = mongoose;

const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;
const mongoPort = process.env.MONGO_PORT;
const mongoDb = process.env.MONGO_INITDB_DATABASE;

export async function connectToMongoDB(): Promise<void> {
  set('strictQuery', false);

  await db
    .connect(`mongodb://${mongoUser}:${mongoPassword}@mongo-rpg:${mongoPort}/${mongoDb}`)
    .then(() => console.log('\x1b[33;1m', '-----> Conectado ao MongoDB <-----', '\x1b[0m\n'))
    .catch((err: MongooseError) => console.log(err));
}
