// noinspection ExceptionCaughtLocallyJS

const {verify} = require('jsonwebtoken');

const auth = function (req, res, next) {
    try {
        let token = verify(req.headers.accesstoken, process.env.privateKey)
        if (token) {
            next();
        } else {
            console.log("Error Middle ware")
            throw {name: 'JsonWebTokenError'};
        }
    } catch (error) {
        console.log(req.originalUrl)
        if(req.originalUrl === '/users/login' || req.originalUrl === '/users/register'){
            next();
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({message: 'Invalid JWT'})
        } else return res.status(500).json({message: error.message})
    }
};
module.exports = auth;
