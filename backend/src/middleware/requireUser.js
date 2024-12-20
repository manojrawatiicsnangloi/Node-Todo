const { get } = require("lodash");

const requireUser = async(req, res, next)=>{

    const user = get(req, "user");
    if(!user){
        return res.status(401).send({"error": "Unauthorize user"})
    }
    return next();
}

module.exports = requireUser;