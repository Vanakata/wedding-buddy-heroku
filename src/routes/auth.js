const express = require('express');
const passport = require('passport');
const validator = require('validator');

const router = new express.Router();

function validateRegisterForm(input) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!input || typeof input.username !== 'string' || input.username.trim().length < 4) {
        isFormValid = false,
            errors.username = 'Username must be at least 4 characters long'

    }
    if (!input || typeof input.email !== 'string' || !validator.isEmail(input.email)) {
        isFormValid = false;
        errors.email = 'E-mail is invalid'
    }
    if (!input || typeof input.password !== 'string' || input.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must be at least 8 characters long';
    }
    if (!isFormValid) {
        message = 'Check the form for errors'
    }
    return {
        success: isFormValid,
        message,
        errors
    }

}

function validateLoginForm(input) {

    let errors = {};
    let isFormValid = true;
    let message = '';

    if (!input || typeof input.username !== 'string' || input.username.trim().length === 0) {

        isFormValid = false;
        errors.username = 'Please provide a correct username.'
    }
    if (!input || typeof input.password !== 'string' || input.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Password is incorrect.'
    }
    if (!isFormValid) {
        message = 'Check input forms for errors'
    }
    return {
        success: isFormValid,
        message,
        errors,
    }
}

router.post('/admin/signup', (req, res, next) => {
    const validationResult = validateRegisterForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,

        });
    };
    return passport.authenticate('local-signup', (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err,
            });
        };
        return res.status(200).json({
            success: true,
            message: 'Registration is successful!'
        })
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);

    if (!validationResult.success) {

        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,
        })
    }
    return passport.authenticate('local-login', (err, token, userData) => {
 
        if (err) {

            
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json(({
                    success: false,
                    message: err.message,
                }));
            };
            return res.status(400).json({
                success: false,
                message: `${err}`,
            });
        };
        return res.status(200).json({
            success: true,
            message: `Welcome, ${req.body.username}`,
            token,
            user: userData,
        })
    })(req,res,next)
})
module.exports = router;