import mongoose from 'mongoose';

const db = mongoose;

const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;
const mongoPort = process.env.MONGO_PORT;

export async function connectToMongoDB(): Promise<void> {
  try {
    await db.connect(`mongodb://${mongoUser}:${mongoPassword}@mongo-rpg:${mongoPort}`);

    console.log('Conectado ao MongoDB');
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    console.log(message ?? 'Erro conectando ao MongoDB');
  }
}
