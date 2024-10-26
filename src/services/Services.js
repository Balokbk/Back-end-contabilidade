const dataSource = require('../database/models')

class Services{
    constructor(modelName){
        this.model = modelName
    }
    async getAllRegisters(){
        return dataSource[this.model].findAll()
    }
    async getById(id){
        return dataSource[this.model].findByPk(id)
    }
    async getAccIdByUserId(id){
        return dataSource['Account'].findOne({where:{user_id:Number(id)}})
    }
    async createRegister(registData){
        return dataSource[this.model].create(registData)
    }
    async updateRegist(updateData, where){
        const updatedList = dataSource[this.model].update(updateData, {where: {...where}})
        if(updatedList[0] === 0){
            return false
        }
        return true
    }
    async delete(id){
        return dataSource[this.model].destroy({where:{...id}})
    }
}

module.exports = Services