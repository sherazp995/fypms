var jwt = require('jsonwebtoken');

var auth = function(req, res, next) {
    try {
        let token = jwt.verify(req.headers.token, process.env.privateKey)
        console.log(req)
        if (token) {
            next();
        } else {
            console.log("Error Middle ware")
            throw {name:'JsonWebTokenError'};
        }
    } catch (error) {
        console.log(req.originalUrl)
        if(req.originalUrl == '/users/login' || req.originalUrl == '/users/register'){
            next();
        }
        else if (error.name == 'JsonWebTokenError') {
            return res.json({status:-1, message: 'Invalid JWT'})
        }
        else return res.json({ status: 0, message: error.message })
    }
};
module.exports = auth;
