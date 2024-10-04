const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const User = new Schema({
    _id: Schema.Types.ObjectId,
    username: {type:String },
    password: {type:String},
    name: {type:String },
    birth: {type:String },
    sex: {type:String },
 
})

module.exports = mongoose.model('user', User)
