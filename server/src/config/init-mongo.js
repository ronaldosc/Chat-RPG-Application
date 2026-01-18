import * as dotenv from 'dotenv';
dotenv.config();

const env = {
  db: process.env.MONGO_INITDB_DATABASE,
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  password: process.env.MONGO_INITDB_ROOT_PASSWORD,
};

// Criar a database
db = db.getSiblingDB(env.db);

// Criar o usuário e a senha de acesso ao banco de dados
db.createUser({
  user: env.user,
  pwd: env.password,
  roles: [{ role: "readWrite", db: env.db }]
});
