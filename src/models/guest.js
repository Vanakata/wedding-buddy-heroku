const mongoose = require('mongoose');

let guestSchema = new mongoose.Schema({
    firstName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    isComing: {
        type: mongoose.SchemaTypes.String, default:"Not checked"

    },
    weddingId: {
        type: mongoose.Schema.Types.ObjectId, required: true
    }
});

let Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;