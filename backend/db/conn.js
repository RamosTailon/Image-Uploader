require('dotenv').config()
const mongoose = require('mongoose')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async () => {
    try {
        await mongoose.set("strictQuery", true)

        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hhltjrx.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('Conectou ao banco de dados MongoDB Remoto')
        return dbConn
    } catch (error) {
        console.log('Não foi possível conectar ao Mongoose!:  ' + error)
    }
}

conn()

module.exports = conn