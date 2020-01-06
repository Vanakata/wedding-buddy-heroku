const mongoose = require('mongoose');

const encryption = require('../utils/encryption');

let userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    weddingDate: {
        type: mongoose.SchemaTypes.String,

    },
    groom: {
        type: mongoose.SchemaTypes.String,

    },
    bride: {
        type: mongoose.SchemaTypes.String,

    },
    bestMan: {
        type: mongoose.SchemaTypes.String,
    },
    godmother: {
        type: mongoose.SchemaTypes.String,
    },
    ceremonyPlace: {
        type: mongoose.SchemaTypes.String,
    },
    ceremonyStart: {
        type: mongoose.SchemaTypes.String
    },
    ceremonyEnd: {
        type: mongoose.SchemaTypes.String
    },
    partyPlace: {
        type: mongoose.SchemaTypes.String,
    },
    partyStart: {
        type: mongoose.SchemaTypes.String,
    }, partyEnd: {
        type: mongoose.SchemaTypes.String,
    },
    roles: [{
        type: mongoose.SchemaTypes.String
    }],
    salt: {
        type: String,
        required: true
    }

});

userSchema.method({
    authenticate: function (password) {
        return encryption.hashedPassword(this.salt, password) === this.password
    }
})

let User = mongoose.model('User', userSchema);
module.exports = User;
module.exports.seedAdminUser = () => {
    User.find({})
        .then(users => {
            if (users.length > 0) {
                return;
            } else {
                let salt = encryption.generateSalt();
                let adminPass = process.env.ADMIN_PASS || "wedding123";
                let adminEmail = process.env.ADMIN_E_MAIL || "admin@abv.bg";
                let adminUsername = process.env.ADMIN_USERNAME || "admin";
                let password = encryption.hashedPassword(salt, adminPass);
                
                User.create({

                    email: adminEmail,
                    username:adminUsername,
                    password,
                    salt,
                    roles: ['admin'],
                });
            };
        });
};

