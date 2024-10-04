const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Round = new Schema({
    _id: Schema.Types.ObjectId,
    nameRound: { type: String },
    descriptionRound: { type: String },
    conditionWinning: {type: String},
    conditionlevel: { type: String },
})

module.exports = mongoose.model('Round', Round)
