const Services = require('./Services.js')
const dataSource = require('../database/models')

class Accountservices extends Services{
    constructor(){
        super('Account')
    }
    async getAccountByUserId(userId){
        return dataSource['Account'].findOne({where:{user_id:userId}})
    }
    async deleteByUserId(userId){
        return dataSource['Account'].destroy({where:{user_id:userId}})
    }
}

module.exports = Accountservices