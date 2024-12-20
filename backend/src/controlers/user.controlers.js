const { omit } = require("lodash");
const { createUser } = require("../services/user.service");

const createUserHandler = async (req, res, next)=>{
    try {
        console.log(req.body);
        const user = await createUser(req.body);
        return res.status(200).send(omit(user.toJSON()));
    } catch (err) {
        console.log(err);
        return res.status(409).json({"error" :err.message });
    }
}

module.exports = { createUserHandler };