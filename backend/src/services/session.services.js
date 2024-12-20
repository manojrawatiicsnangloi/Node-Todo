const { get } = require("lodash");
const Session = require("../model/session.model");
const { jwtSign, userDecode } = require("../utils/utils.jwt");
const { findUser } = require("./user.service");


const createSession = async (userId , userAgent) =>{
    const session = await Session.create({
        user : userId, userAgent, isValid : true
    });
    return session.toJSON();
}

const createAccessToken = ({user, session}) =>{
    const accessToken = jwtSign(
        {
            ...user,
            session : session._id,
        },
        { expiresIn : "60000m" }
    )
    return accessToken;
}

const reIssueAccessToken = async ({ refreshToken }) => {
    const { decode } = userDecode(refreshToken);
    if(!decode || !get(decode , "_id")) return false;
    const session = await Session.findById(get(decode, "_id"));

    if(!session || !session?.valid) return false;
    const user = await findUser({ _id : session.user });

    if(!user) return false;
    const accessToken = createAccessToken({ user, session });
    return accessToken;
}

const updateSession = async (query, update)=>{
    return await Session.updateOne(query, update);
}

const findSession = async (query)=>{
    return await Session.find(query).lean();
}

module.exports = {
    reIssueAccessToken,
    createAccessToken,
    createSession,
    updateSession,
    findSession
}