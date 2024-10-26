const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

function generateToken(userId){
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })
}
function verifyToken(token){
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { generateToken, verifyToken }