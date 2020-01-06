const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
}, (req, username, password, done) => {
    const userToLogin = {
        username: username.trim(),
        password: password.trim(),
    }
    User.findOne({ username: userToLogin.username })
        .then(user => {
            if (!user || !user.authenticate(userToLogin.password)) {
                const error = new Error('Incorrect username or password');
                error.name = 'IncorrectCredentialsError';
                return done(error);
            }
            const input = {
                sub: user.id
            }
            const secret = process.env.SECRET || 'dv3 k3ba43ta 3a m3z3'; 
            const token = jwt.sign(input,secret );
            const data = {
                id: user._id,
                username: user.username
            }
            if (user.roles) {
                data.roles = user.roles
            };
            return done(null, token, data)
        })

})
