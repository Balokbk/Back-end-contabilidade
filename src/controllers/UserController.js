const Controller = require('./Controller.js')
const UserServices = require('../services/userServices.js')
const AccountServices = require('../services/accountServices.js');
const AccountController = require('../controllers/AccountController.js')
const TransactionsController = require('../controllers/TransactionController.js')
const { hashPassword, validatePassword } = require('../helpers/passwordHelper.js')
const { generateToken } = require('../helpers/tokenHelper.js')

const userServices = new UserServices()
const accountServices = new AccountServices()
const accountController = new AccountController()
const transactionController = new TransactionsController()

class UserController extends Controller{
    constructor(){
        super(userServices, 'user_id')
    }
    async getProfile(req, res){
        const id = req.user.userId
        const where = Number(id)
        try{
            const user = await this.entityService.getById(where)
            const account = await accountServices.getAccountByUserId(where)

            if (user){
                delete user.password_hash; // Removendo informação sensível da resposta
                delete user.createdAt;
                delete user.updatedAt;
            }
            if(account){
                delete account.createdAt;
                delete account.updatedAt;
            }
            return res.status(200).json({user:user,account:account})
        }catch(error){
            return res.status(500).json({type:error, message:error.message})
        }
    }
    // o Json enviado tem que ter esse formato
    // {
    //     "username": "nome_de_usuario",
    //     "email": "usuario@exemplo.com",
    //     "password": "senha_segura",
    //     "balance": 100.00 // Este campo é opcional, se você quiser definir um saldo inicial
    // }
    async createNew(req, res){
        const { password, balance, ...createData} = req.body
        if(!password){
            return res.status(400).json({message:'O campo de senha é obrigatório'})
        }
        try{
            const hashedPassword = await hashPassword(password)
            const newUser = await this.entityService.createRegister({...createData, password_hash: hashedPassword})
            const newAccount = await accountServices.createRegister({
                user_id: newUser.user_id,
                balance: parseFloat(balance) || 0
            })
            return res.status(201).json({ message:'Registro criado com sucesso', UserEmail: newUser.email, AccountId: newAccount.account_id, AccountUserId: newAccount.user_id, AccountBalance: newAccount.balance })
        }catch(error){
            if(error.name === 'SequelizeUniqueConstraintError'){
                return res.status(409).json({message:'Email já cadastrado'})
            }
            return res.status(500).json({type:error, message:error.message})
        }
    }
    async deleteUser(req, res){
        const userId = req.user.userId
        const where = Number(userId)
        try{
            const user = await this.entityService.getById(where)
            if(!user){
                return res.status(404).json({message: 'Usuário não encontrado'})
            }
            await transactionController.deleteByUserId(where)
            await this.entityService.deleteAll(where)
            return res.status(200).json({message:'Usuário deletado com sucesso'})
        }catch(error){
            return res.status(500).json({message:"Error", error: error.message})
        }
    }
    // O json de login tem que ser asssim
    // {
    //     "email":"emailAqui",
    //     "password":"senhaAqui"
    // }
    async login(req, res){
        const { email, password } = req.body
        try{
            const user = await this.entityService.getByEmail(email)
            if(!user || !(await validatePassword(password, user.password_hash))){
                return res.status(401).json({message:'Email ou senha incorretos'})
            }
            const token = generateToken(user.user_id)
            //Após pegar o token, avisar o front de armazenar o token no localStorage: Authorization: Bearer <token>
            return res.status(200).json({message:'Login bem sucedido', token})
        }catch(error){
            return res.status(500).json({type:error, message:error.message})
        }
    }
}

module.exports = UserController