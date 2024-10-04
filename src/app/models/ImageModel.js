const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Image = new Schema({
    _id: Schema.Types.ObjectId,
  
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    
}, { timestamps: true })

module.exports = mongoose.model('image', Image)
