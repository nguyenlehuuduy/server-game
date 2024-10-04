const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Question = new Schema({
    _id: Schema.Types.ObjectId,
    content: {
        decription: { type: String },
        imagePath: { type: String }
    },
    answer: [{ type: String }],
    option: [
        { type: String }
    ],

    idType: {
        type: Schema.Types.ObjectId,
        ref: 'TypeQuestion'
    },
    idTopic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    },
    idRound: {
        type: Schema.Types.ObjectId,
        ref: 'Round'
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Question', Question)

