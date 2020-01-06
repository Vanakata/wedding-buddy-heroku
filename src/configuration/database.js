const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.Promise = global.Promise;

module.exports = (configurationObject) => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MyWeddingSite',{ useNewUrlParser: true,useCreateIndex: true, });
    let db = mongoose.connection;

    db.once('open', err => {
        if (err) {
            throw err;
        }
        console.log('MongoDB ready');
        User.seedAdminUser();
    })
    db.on('error',err=>console.log(`Database error ${err}`));
}
