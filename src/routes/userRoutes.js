const { Router } = require('express')
const UserController = require('../controllers/UserController.js')
const AccountController = require('../controllers/AccountController.js')
const TransactionController = require('../controllers/TransactionController.js')
const authenticateToken = require('../middlewares/authMiddleware.js')

const userController = new UserController()
const accountController = new AccountController()
const transactionController = new TransactionController()

const router = Router()

//criar conta e login
router.post('/users/create', (req, res) => userController.createNew(req, res))
router.post('/users/login', (req, res) => userController.login(req,res))

//user
router.get('/users/me', authenticateToken,(req, res) => userController.getProfile(req, res))
router.put('/users/me', authenticateToken,(req, res) => userController.update(req, res))
router.delete('/users/me', authenticateToken,(req, res) => userController.deleteUser(req, res))

//transactions
router.get('/transactions/accounts', authenticateToken,(req, res) => transactionController.getAllTransactionsByAccount(req, res))
router.get('/transactions/:id', authenticateToken,(req, res) => transactionController.getById(req, res))
router.post('/transactions', authenticateToken,(req, res) => transactionController.doTransaction(req, res))

module.exports = router