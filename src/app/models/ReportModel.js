const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Report = new Schema({
    _id: Schema.Types.ObjectId,
    reportcontent: { type: String },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
})

module.exports = mongoose.model('Report', Report)

