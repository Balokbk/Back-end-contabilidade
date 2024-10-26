const { verifyToken } = require('../helpers/tokenHelper.js')

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    if(!token){
        return res.sendStatus(401)
    }
    try{
        const user = verifyToken(token)
        req.user = user
        next()
    }catch(error){
        res.sendStatus(403)
    }
}

module.exports = authenticateToken