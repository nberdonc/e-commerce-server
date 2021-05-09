const jwt = require('jsonwebtoken')
const config = require('./config')

const getToken = (user) => {
    console.log("from util user", user)
    return jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '24h'
    })
}

module.exports = {
    getToken,
}