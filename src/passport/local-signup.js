const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const encryption = require('../utils/encryption');

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
}, (req, email, password, done) => {
    const user = {
        email: email.trim(),
        password: password.trim(),
        username: req.body.username.trim().toLowerCase(),
        weddingDate:req.body.weddingDate.trim(),
        groom:req.body.groom.trim().toLowerCase(),
        bride:req.body.bride.trim().toLowerCase(),
        bestMan:req.body.bestMan.trim().toLowerCase(),
        godmother:req.body.godmother.trim().toLowerCase(),
        ceremonyPlace:req.body.ceremonyPlace.trim(),
        ceremonyStart:req.body.ceremonyStart.trim().toLowerCase(),
        ceremonyEnd:req.body.ceremonyEnd.trim().toLowerCase(),
        partyPlace:req.body.partyPlace.trim(),
        partyStart:req.body.partyStart.trim().toLowerCase(),
        partyEnd:req.body.partyEnd.trim().toLowerCase(),

    };
    User.find({ email: email })
        .then(users => {
            if (users.length > 0) {
                return done('User with that e-mail, already exists');
            }
            user.salt = encryption.generateSalt();
            user.password = encryption.hashedPassword(user.salt,user.password);
            user.roles=[];
            User.create(user)
            .then(()=>{
                return done(null);
            })
            .catch(()=>{
                return done('Something went wrong. Check forms for errors.')
            })
        })
})