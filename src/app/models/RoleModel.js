const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = new Schema({
    _id: Schema.Types.ObjectId,
    nameRole: { type: String },
    descriptionRole: { type: String },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
})
module.exports = mongoose.model('Role', Role)