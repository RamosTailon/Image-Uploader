const mongoose = require('mongoose')

const { Schema } = mongoose

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Image = mongoose.model(
    'Image', ImageSchema
)

module.exports = Image