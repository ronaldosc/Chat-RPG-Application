// Criar a database "chatrpg"
db = db.getSiblingDB('chatrpg');

// Criar o usuário "root" com a senha "123"
db.createUser({
  user: "root",
  pwd: "123",
  roles: [{ role: "readWrite", db: "chatrpg" }]
});
