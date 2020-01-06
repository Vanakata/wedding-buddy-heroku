const express = require('express');
const authCheck = require('../configuration/auth-check');
const weddings = require('../models/user');

const router = new express.Router();

router.get('/all', (req, res) => {
    weddings.find()
        .then(users => {
            res.status(200).json(users)
        })
})


module.exports = router;