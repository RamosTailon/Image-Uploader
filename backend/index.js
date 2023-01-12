const express = require('express')
const cors = require('cors')

const app = express()

//CONFIGURANDO JSON
app.use(express.json())

app.use(cors({
    //5173 PARA A PORTA DO REACT.JS USANDO O YARN VITE
    credentials: true, origin: 'http://localhost:5173'
}))

//PASTA ROOT 
app.use(express.static('public'))


//ROUTE
const imageRoute = require('./routes/ImageRoutes')

app.use('/image', imageRoute)

const port = 5000
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})