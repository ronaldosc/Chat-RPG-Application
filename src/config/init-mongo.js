// acredito que necessita dessa linha para autenticar na db, pois a database que for criar tem que ter a role básica 'admin'
// assim: authSource: "admin" adicionado na instancia da conexão

// Criar a database "chatrpg"
db = db.getSiblingDB('chatrpg');

// Criar o usuário "root" com a senha "123"
db.createUser({
  user: "root",
  pwd: "123",
  roles: [{ role: "readWrite", db: "chatrpg" }]
});
