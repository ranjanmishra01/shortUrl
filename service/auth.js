const jwt = require('jsonwebtoken');
const secret = 'Ranjan$123';

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        name: user.name,
    }, secret);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret); //is id se jo value align hoga wah mil jaaega
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser, getUser,
};