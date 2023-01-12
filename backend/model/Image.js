const mongoose = require('../db/conn')

const { Schema } = mongoose

const Image = mongoose.model(
    'Image',
    new Schema({
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
)

module.exports = Image