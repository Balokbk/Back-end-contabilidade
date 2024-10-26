const Services = require('./Services.js')
const dataSource = require('../database/models')

class UserServices extends Services{
    constructor(){
        super('User')
    }
    async getByEmail(email){
        return dataSource['User'].findOne({where: {email}})
    }
    async deleteAll(id){
        return dataSource['User'].destroy({where:{user_id:id}})
    }
}

module.exports = UserServices