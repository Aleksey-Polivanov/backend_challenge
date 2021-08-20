const
    validator = require('email-validator'),

    helpers = require('../lib/helpers.js'),
    checker = require('../lib/checker.js'),

    passwordService = require('../services/password.js'),
    userService = require('../services/user.js'),
    authService = require('../services/auth.js');

const forgotPassword = async (req, res) => {
    try {
        let requiredFields = ['email'];
        checker.checkRequiredFields(req.body, requiredFields);
        req.body.email = checker.checkEmail(req.body.email);
        let user = await userService.getOne({email: req.body.email});

        if (!user) {
            throw ({status: 422, message: 'Looks like you do not have an account yet.', stack: new Error().stack});
        }

        await passwordService.forgotPassword(user);

        return res.status(200).send({
            notice: 'Reset email sent',
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const validateResetToken = async (req, res) => {
    try {
        if (!req.query.token) {
            throw ({status: 422, message: 'Nothing to reset here', stack: new Error().stack});
        }

        let user = await userService.getOne({resetToken: req.query.token});

        if (!user) {
            throw ({status: 404, message: 'Nothing was found', stack: new Error().stack});
        }

        return res.status(200).send({
            success: true,
            data: {email: user.email}
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const resetPassword = async (req, res) => {
    try {
        let requiredFields = ['email', 'password'];
        checker.checkRequiredFields(req.body, requiredFields);
        req.body.email = req.body.email.toLowerCase();

        if (!validator.validate(req.body.email)) {
            throw ({status: 422, message: 'Invalid email address, try again', stack: new Error().stack});
        }

        let user = await userService.getOne({email: req.body.email});

        if (!user) {
            throw ({status: 404, message: 'Nothing was found', stack: new Error().stack});
        }

        let updateData = await passwordService.resetPassword(user, req.body);
        user = await userService.update(user, updateData);
        user = authService.getAuthData(user);

        return res.status(200).send({
            data: {user: user}
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

module.exports = {
    forgotPassword: forgotPassword,
    validateResetToken: validateResetToken,
    resetPassword: resetPassword
};
