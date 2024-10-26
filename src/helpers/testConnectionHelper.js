const { Sequelize } = require('sequelize')
const config = require('../database/config/config.js')

const dbConfig = config['development']

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
})

module.exports = async function testConnection(){
    try{
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados feita com sucesso!')
    }catch(error){
        console.error('Não foi possível conectar ao BD', error)
    }
}