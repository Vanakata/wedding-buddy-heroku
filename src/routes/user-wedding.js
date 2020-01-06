const express = require('express');
const authCheck = require('../configuration/auth-check');
const weddings = require('../models/user');

const router = new express.Router();

router.get('/wedding-homepage', authCheck, (req, res) => {
    weddings.find(req.user._id)
        .then(wedding => {

            res.status(200).json(wedding)
        })
})
module.exports = router;