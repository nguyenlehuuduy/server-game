const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const process = require('process');

async function connect() {
    try {
        console.log(process.env.CONNECT_MONGO_DB)
        //connect to monggo by script tab        
        await mongoose.connect('mongodb+srv://estigamenlp:'+process.env.CONNECT_MONGO_DB+'@nlpunity.wpapdrd.mongodb.net/');
        console.log("connect ok !!!");
    } catch (error) {
        console.log("connect failure !!!");
    }
}
module.exports = { connect };