const app = require('./src/app.js')
const testServer = require('./src/helpers/testConnectionHelper.js')

const PORT = 3000

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
    testServer()
})