const { get } = require("lodash");
const express = require("express");
const { userDecode, jwtSign } = require("../utils/utils.jwt");
const { reIssueAccessToken } = require("../services/session.services");

const deserializeUser = async (req, res, next)=>{
    try{
        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
        const refreshToken = get(req, "headers.x-refresh");
        if(!accessToken){
            return next();
        }
        const { decode, expired } = userDecode(accessToken);
        if (decode){
            req.user = decode;
            return next();
        }
        if(expired && refreshToken){
            const newAccessToken = await reIssueAccessToken({ refreshToken });
            if (newAccessToken){
                res.setHeader("x-access-token", newAccessToken);
                const decode = userDecode(newAccessToken);
                req.user = decode;
            }
            return next();
        }
        return next();
    } catch (error){
        console.log(error);
        return res.status(500);
    }
}

module.exports = deserializeUser;