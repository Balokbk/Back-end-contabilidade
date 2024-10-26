const Services = require('./Services.js')
const dataSource = require('../database/models')

class TransactionsServices extends Services{
    constructor(){
        super("Transaction")
    }
    async doTransaction(data){
        const t = await dataSource.sequelize.transaction()
        try{
            const transaction = await dataSource['Transaction'].create(data, { transaction: t })
            await this.updateAccountBalance(data.account_id, data.amount, data.type, { transaction: t })
            await t.commit()
            return transaction
        }catch(error){
            await t.rollback()
            throw error
        }
    }
    async getAllTransactionsByAccount(accId){
        return dataSource['Transaction'].findAll({where:{account_id:accId}})
    }
    async getById(where){
        return dataSource['Transaction'].findOne({where:{...where}})
    }
    async updateAccountBalance(accountId, amount, type, options){
        const account = await dataSource['Account'].findByPk(accountId, options)
        if(!account){
            throw new Error('Conta não encontrada')
        }
        const amt = parseFloat(amount)
        const currBalance = parseFloat(account.balance)

        const newBalance = type === 'income'? currBalance + amt : currBalance - amt;
        return dataSource['Account'].update({balance: newBalance}, {where: {account_id: accountId}, ...options})
    }
    async deleteByAccId(id){
        return dataSource['Transaction'].destroy({where:{account_id:id}})
    }
}

module.exports = TransactionsServices