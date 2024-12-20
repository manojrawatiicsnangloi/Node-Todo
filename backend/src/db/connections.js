const mongoose = require("mongoose");
const config = require("../config");


const connectToDbFunc = async ()=>{
    try {
       return mongoose.connect(config.dbUri);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectToDbFunc;