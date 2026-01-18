# <center> Desafio Ciclo 2  <center> Alpha EdTech (turma Turing)
  
## Aplicação <u>Chat RPG</u>:
  > ### *`Rede social para jogadores de RPG de mesa`*

## Instruções passo a passo para subir a aplicação

  1. *Na pasta `client`, executar:*

```gql
npm i && npm start
```

</br>

  2. *Definir o endereço da API em `baseURL` no arquivo `client/src/libs/api.ts`:*

```ts
export const api = axios.create({
  baseURL: `https://${host}:5000`,
  withCredentials: true,
});
```
</br>

  3. *Na pasta `server`, executar:*

```gql
npm install
cp .env.example .env
```
</br>

  4.  *Configurar o seguinte:*
- Defina o banco de dados (db) e o usuário/senha para acessar o mongoDB no script `server/src/config/init-mongo.js` a partir das variáveis de ambiente no `.env` criado, como:

```ts
db = db.getSiblingDB('chatrpg');
db.createUser({
    user: "root",
    pwd: "123",
    roles: [{ role: "readWrite", db: "chatrpg" }]
});
```

- Antes de seguir para o próximo passo, cerfique-se de informar outras variáveis de ambiente corretamente no `.env`.
</br>

  5. *Na pasta raiz/inicial do repositório, execute isso para realizar o deploy da aplicação*:

```gql
docker compose up -d
```
