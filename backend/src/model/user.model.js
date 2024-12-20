const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {type : String, required: true, unique : true},
    email : {type : String, required : true},
    password : {type : String, required : true}
});

userSchema.pre("save", async function (next) {
    const user = this
    if(!user.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password , salt)
    user.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (userPassword) {
    const user = this;
    try {
        return await bcrypt.compare(userPassword, user.password);
} catch (error) {
        console.log(error);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;