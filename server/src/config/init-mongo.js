import * as dotenv from 'dotenv';

dotenv.config();

// Criar a database
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

// Criar o usuário e a senha de acesso ao banco de dados
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGO_INITDB_DATABASE }]
});
