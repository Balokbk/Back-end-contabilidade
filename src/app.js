const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
app.use(cors({
    methods:['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json())

routes(app)

module.exports = app