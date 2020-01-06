const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
               
    if (!req.headers.authorization) {
        return res.status(401).end()
    }

    
    const token = req.headers.authorization.split(' ')[1];
    const secret = process.env.SECRET || 'dv3 k3ba43ta 3a m3z3'; 
   
    return jwt.verify(token, secret, (err, decoded) => {
        
        if (err) {
                        
            return res.status(401).end();
        }
        const userId = decoded.sub

        User.findById(userId)
        .then(user=>{
            if(!user){
                return res.status(401).end()
            }
            req.user = user;
            return next();
        })
    })
}
