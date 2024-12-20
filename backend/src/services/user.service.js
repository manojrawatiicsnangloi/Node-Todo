const { omit } = require("lodash");
const User = require("../model/user.model");


const createUser = async (user)=>{
    try {
        return await User.create(user);
    } catch (error) {
        throw new Error(error);
    }
}

const findUser = async (query)=>{
    try {
        return await User.find(query);
    } catch (error) {
        throw new Error(error);
    }
}

const validatePassword = async ({
    email,
    password
})=>{
    const user = await User.findOne({ email });
    if(!user){
        return false;
    }
    const isValid = await user.comparePassword(password);
    if (!isValid){
        return false;
    }
    return omit(user.toJSON(), "password", "password2");
}

module.exports = {
    createUser, findUser, validatePassword
}