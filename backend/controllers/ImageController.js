const Image = require('../model/Image')

//helpers
const ObjectId = require('mongoose').Types.ObjectId

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
		// console.log(imageList)

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
			//RENDER EM AMBIENTE DE PRODUÇÃO
			res.status(201).json({ message: "imagem(s) salva!", imageSave })
		} catch (err) {
			res.status(500).json({ message: err })
		}
	}

	static async getAll(req, res) {
		const imagesView = await Image.find().sort("-createAt")

		res.status(200).json({
			view: imagesView
		})
	}

	static async getOne(req, res) {
		const id = req.params.id

		//VERIFICAÇÃO DE SE EXISTE ESSE ID
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: 'ID inválido!' })
			return
		}

		//VERIFICANDO SE A IMAGEM EXISTE
		const imageDetails = await Image.findOne({ _id: id })

		if (!imageDetails) {
			res.status(404).json({ message: 'Imagem não encontrada!' }) //404 = recurso inexistente
			return
		}

		res.status(200).json({
			details: imageDetails,
		})
	}

	static async removeImageById(req, res) {
		const id = req.params.id

		//VERIFICAÇÃO DE SE EXISTE ESSE ID
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: 'ID inválido!' })
			return
		}

		//VERIFICANDO SE A IMAGEM EXISTE
		const imageDetails = await Image.findOne({ _id: id })

		if (!imageDetails) {
			res.status(404).json({ message: 'Imagem não encontrada!' }) //404 = recurso inexistente
			return
		}

		await Image.findByIdAndRemove(id)

		res.status(200).json({ message: "Imagens removido com sucesso!" })
		//regra de negócio para deletar a imagem do provider; seja em nuvem ou no próprio computador
	}

	static async updateImage(req, res) {
		const id = req.params.id

		const { name, rating } = req.body
		const images = req.files

		const updateData = {}

		//VERIFICAÇÃO DE SE EXISTE ESSE ID
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: 'ID inválido!' })
			return
		}

		//VERIFICANDO SE A IMAGEM EXISTE
		const imageDetails = await Image.findOne({ _id: id })

		if (!imageDetails) {
			res.status(404).json({ message: 'Imagem não encontrada!' }) //404 = recurso inexistente
			return
		}

		//VALIDAÇÕES
		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatório!' })
			return
		} else {
			updateData.name = name
		}

		if (!rating) {
			res.status(422).json({ message: 'Classifique de 1 a 5!' })
			return
		} else {
			updateData.rating = rating
		}

		if (images.length > 0) {
			updateData.images = [] //INSTANCIOU EM ARRAY
			images.map((item) => {
				updateData.images.push(item.filename)
			})
		}

		await Image.findByIdAndUpdate(id, updateData)
		res.status(200).json({ message: 'Imagem atualizada com sucesso!' })
	}
}