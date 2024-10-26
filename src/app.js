const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
app.use(cors)
app.use(express.json())

routes(app)

module.exports = app