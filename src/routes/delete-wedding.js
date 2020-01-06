const express = require('express');
const authCheck = require('../configuration/auth-check');
const weddings = require('../models/user');

const router = new express.Router()
router.delete('/delete/:id', authCheck, (req, res) => {
    const id = req.params.id;
    
    weddings.findById(id)
        .then((wedding) => {
            wedding.remove().then(() => {
                return res.status(200).json({
                    success: true,
                    message: "Weddding successfully deleted"
                })
            }).catch(err => {
                console.log(err);
                return res.status(404).json({
                    success: false,
                    message: "Guest does not exists in database"

                });
            })
        })
})
module.exports = router;