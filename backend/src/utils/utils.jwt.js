const jwt = require("jsonwebtoken");
const private_key = "private_key";

const jwtSign = (object, options = undefined)=>{
    return jwt.sign(object, private_key, options);
}

const userDecode = (token)=>{
    try {
        const decode = jwt.verify(token, private_key);
        return {
            expired : false,
            valid : true,
            decode
        }
    } catch (error) {
        console.log(error);
        return {
            expired : true,
            valid : error.message = "jwt expired",
            decode : null
        }
    }
}

module.exports = { jwtSign , userDecode}