const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const TypeQuestion = new Schema({
    _id: Schema.Types.ObjectId,
    nameType: { type: String },
    descriptionType: { type: String },
    roleOfAnswer: {type: String}
})

module.exports = mongoose.model('TypeQuestion', TypeQuestion)
