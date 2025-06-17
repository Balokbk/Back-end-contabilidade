const bcrypt = require('bcryptjs')

async function hashPassword(password){
    return await bcrypt.hash(password, 10)
}

async function validatePassword(password, hashedPassword){
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hashPassword, validatePassword }