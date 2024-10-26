const express = require('express')
const users = require('./userRoutes.js')

module.exports = app =>{
    app.use(express.json(), users)
}
