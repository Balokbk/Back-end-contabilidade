const Controller = require('./Controller.js')
const AccountServices = require('../services/accountServices.js')

const accountServices = new AccountServices()

class AccountController extends Controller{
    constructor(){
        super(accountServices, 'account_id')
    }
    async getAccountByUserId(req, res){
        const { id } = req.params
        const where = Number(id)
        try{
            const accountById = await this.entityService.getAccountByUserId(where)
            if(!accountById || accountById.length === 0){
                return res.status(404).json({message:'Conta não encontrada'})
            }
            return res.status(200).json(accountById)
        }catch(error){
            return res.status(500).json({message:'Error', error: error.message})
        }
    }
    async deleteByUserId(userId){
        await this.entityService.deleteByUserId(userId)
    }
}

module.exports = AccountController