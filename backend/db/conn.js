const mongoose = require('mongoose')

async function main() {
    await mongoose.set("strictQuery", true)

    //imageUploader
    await mongoose.connect('mongodb://localhost:27017/imageUploader')
    console.log('Conectou ao banco de dados MongoDB!')
}

main().catch((err) => console.log('Não foi possível conectar ao Mongoose!:  ' + err))

module.exports = mongoose