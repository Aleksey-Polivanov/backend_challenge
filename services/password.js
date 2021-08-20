const
    crypto = require('crypto'),

    checker = require('../lib/checker'),

    sendGridService = require('../lib/send-grid'),
    bcrypt = require('bcrypt');

const validPassword = async (password, userPassword) => {
    let check = false;

    if (password) {
        check = await bcrypt.compareSync(password, userPassword);
    }

    return check;
};

const hashNewPassword = async (currentPassword, newPassword) => {
    try {
        let hash = null;

        if (currentPassword !== newPassword) {
            let salt = await bcrypt.genSalt(10);
            hash = await bcrypt.hash(newPassword, salt);
        }

        return hash;
    } catch (err) {
        throw (err);
    }
};

const addNewPassword = async (user, password) => {
    try {
        let hash = await hashNewPassword('', password);

        if (!hash) {
            throw ({ status: 422, message: 'The new password is the same as an existing', stack: new Error().stack });
        }

        user = await user.update({ password: hash });
        return user;
    } catch (err) {
        throw (err);
    }
};

const hashPassword = async (password) => {
    try {
        let salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        throw (err);
    }
};

const checkPassword = async (user, userData) => {
    try {
        if (!user.password) {
            user = await addNewPassword(user, userData.password);
        }

        return user;
    } catch (err) {
        throw (err);
    }
};

const forgotPassword = async (user) => {
    try {
        let buf = await crypto.randomBytes(20);
        user = await user.update({ resetToken: buf.toString('hex') });

        let data = {
            email: user.email,
            link: `/reset-password?token=${user.resetToken}`
        };

        await sendGridService.sendForUsers('resetPassword', data);
    } catch (err) {
        throw (err);
    }
};

const resetPassword = async (user, userData) => {
    try {
        if (userData.token !== user.resetToken) {
            throw ({ status: 422, message: 'Are you sure you typed in the email right?', stack: new Error().stack });
        }

        await checker.checkPassword(userData.password);

        return {
            newPassword: userData.password,
            active: true,
            resetToken: null,
            lastActive: new Date(),
        };
    } catch (err) {
        throw (err);
    }
};

module.exports = {
    validPassword: validPassword,
    addNewPassword: addNewPassword,
    hashNewPassword: hashNewPassword,
    hashPassword: hashPassword,
    checkPassword: checkPassword,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
};
