const Image = require('../model/Image')

//START CLASS
module.exports = class ImageController {
    static async imageUp(req, res) {

        const { name, rating } = req.body
        const images = req.files

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" })
            return
        }
        if (images.length <= 0) {
            res.status(422).json({ message: "Você deve adicionar ao menos uma foto" })
            return
        }
        let imageList = images.map(name => { return name.filename })
        console.log(imageList)

        if (!rating) {
            res.status(422).json({ message: "Classifique de 1 a 5" })
            return
        }

        //PREPARA PARA SALVAR A IMAGEM NO BANCO
        const imageSave = new Image({
            name: name,
            images: imageList,
            rating: rating
        })

        try {
            await imageSave.save()
            res.status(201).json({ message: "imagem(s) salva!", imageSave })
        } catch (err) {
            res.status(500).json({ message: err })
        }
    }
}