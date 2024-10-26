const Controller = require('./Controller.js')
const TransactionService = require('../services/transactionsServices.js')
const AccountController = require('../controllers/AccountController.js')

const transactionsServices = new TransactionService()
const accountController = new AccountController()


class TransactionController extends Controller{
    constructor(){
        super(transactionsServices, 'transaction_id')
    }
    
    // json da transacao
    // {
    //     "type":"income",//só aceita "income" ou "expense"
    //     "account_id":idConta,
    //     "amount":quantidade,
    //     "description":"descricao"//opicional,
    //     "transaction_date":"2024-01-01"//opicional, se não por nada ele coloca como hoje
    // }

    async doTransaction(req, res){
        const userId = req.user.userId
        const where = Number(userId)
        const accId = await accountController.entityService.getAccountByUserId(where)
        const transactionData = {
            account_id: accId.account_id,
            type: req.body.type,
            amount: req.body.amount,
            description: req.body.description,
            transaction_date: req.body.transaction_date || new Date(),
        }
        try{
            const newTransaction = await this.entityService.doTransaction(transactionData)
            return res.status(201).json(transactionData)
        }catch(error){
            res.status(500).json({message:'Error', error:error.message})
        }
    }
    async getAllTransactionsByAccount(req, res){
        const userId = req.user.userId
        const acc = await accountController.entityService.getAccountByUserId(Number(userId))
        const where = Number(acc.account_id)
        try{
            const transactions = await this.entityService.getAllTransactionsByAccount(where)
            if(!transactions || transactions.length === 0){
                return res.status(404).json({message:'Pode estar vazio ou o id está errado'})
            }
            return res.status(200).json(transactions)
        }catch(error){
            res.status(500).json({message:'Error', Message:error.Message})
        }
    }
    async deleteByUserId(id){
        const acc = await this.entityService.getAccIdByUserId(Number(id))
        const accId = acc.account_id
        await this.entityService.deleteByAccId(Number(accId))
    }
    async getById(req, res){
        const userId = req.user.userId
        const acc = await accountController.entityService.getAccountByUserId(Number(userId))
        const whereMe = Number(acc.account_id)
        const { id } = req.params
        const whereTransId = Number(id)
        try{
            const record = await this.entityService.getById({transaction_id:whereTransId ,account_id:whereMe})
            if(!record){
                return res.status(404).json({message:'Resgistro não encontrado'})
            }
            return res.status(200).json(record)
        }catch(error){
            return res.status(500).json({type:error, message:error.message})
        }
    }
}

module.exports = TransactionController