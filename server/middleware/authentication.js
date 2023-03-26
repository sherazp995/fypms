var jwt = require('jsonwebtoken');

var auth = function(req, res, next) {
    try {
        let token = jwt.verify(req.headers.token, process.env.privateKey)
        console.log(token)
        if (token) {
            next()
        } else {
            console.log("Error Middle ware")
            throw {name:'JsonWebTokenError'};
        }
    } catch (error) {
        if (error.name == 'JsonWebTokenError') {
            return res.json({status:-1, message: 'Invalid JWT'})
        }
        else return res.json({ status: 0, message: error.message })
    }
};
module.exports = auth;
