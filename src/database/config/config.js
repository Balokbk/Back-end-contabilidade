const env = require('dotenv').config()
//Aqui é a conexão com o banco de dados, aviso que usei o MySQL para evitar erros
module.exports = {
  "development": {
    "username": //Credenciais>_USERNAME,
    "password": //Credenciais>_PASSWORD,
    "database": //Credenciais>_DATABASE,
    "host": //Credenciais>_HOST,
    "dialect": //Credenciais>_DIALECT(vai ser mysql)
  },
  "test": {
    "username": //Credenciais>_USERNAME,
    "password": //Credenciais>_PASSWORD,
    "database": //Credenciais>_DATABASE,
    "host": //Credenciais>_HOST,
    "dialect": //Credenciais>_DIALECT(vai ser mysql)
  },
  "production": {
    "username": //Credenciais>_USERNAME,
    "password": //Credenciais>_PASSWORD,
    "database": //Credenciais>_DATABASE,
    "host": //Credenciais>_HOST,
    "dialect": //Credenciais>_DIALECT(vai ser mysql)
  }
}
