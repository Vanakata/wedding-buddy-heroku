const crypto = require('crypto');

function generateSalt(){
    const salt = crypto.randomBytes(128).toString('base64');
    return salt
}

function hashedPassword(password,salt){
    const hashedPassword = crypto.createHmac('sha256',salt).update(password).digest('hex');
    return hashedPassword
}
module.exports = {generateSalt,hashedPassword}