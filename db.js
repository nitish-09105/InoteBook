const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017'
const connectToMongo = async() => {
    try{
        mongoose.connect(mongoURI)
        console.log("Connected to mongo successfully")
    }
    catch(error){
        console.error("Couldn't Connect to mongo successfully")
    }
}
module.exports = connectToMongo




