const mongoose = require("mongoose");
const User = require("./user.model");

const sessionSchema = new mongoose.Schema({
       user : {
        type : mongoose.Types.ObjectId , ref : User
       },
       isValid : {
        type : Boolean, required : true 
       },
       userAgent : {
        type : String, default : ""
       }
},
{timestamps : true})

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;