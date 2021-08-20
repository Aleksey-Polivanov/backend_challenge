const
    userService = require('./user'),
    passwordService = require('./password'),

    credentials = require('../credentials'),
    checker = require('../lib/checker'),

    jwt = require('jsonwebtoken'),
    jwtSecret = credentials.JWTSecret;

const getAuthData = (user) => {
    try {
        delete user.password;
        let token = jwt.sign({id: user.id}, jwtSecret);
        return {
            user: user,
            token: token
        }
    } catch (err) {
        throw (err);
    }
};

const webSiteAuthorization = async (userData) => {
    try {
        let requiredFields = ['email', 'password'];
        checker.checkRequiredFields(userData, requiredFields);

        userData.email = checker.checkEmail(userData.email);

        let user = await userService.getOne({email: userData.email.toLowerCase()});

        if (!user) {
            throw ({status: 404, message: 'User not found', stack: new Error().stack });
        }

        user = await passwordService.checkPassword(user, userData);

        let valid = await passwordService.validPassword(userData.password, user.password);

        if (!valid) {
            throw ({ status: 422, message: 'Your credentials are incorrect. Please try again or reset via "Forgot Password"', stack: new Error().stack });
        }

        user = await user.update({lastActive: new Date()});

        return user;
    } catch (err) {
        throw (err);
    }
};

const facebookAuthorization = async (userData) => {
    try {
        let requiredFields = ['email', 'userID'];
        checker.checkRequiredFields(userData, requiredFields);
        userData.email = checker.checkEmail(userData.email);

        let user = await userService.getOne({ email: userData.email });
        if (user) {
            let updateData = { lastActive: new Date() };
            if (!user.facebookId) updateData.facebookId = userData.id;
            user = await user.update(updateData);
        } else {
            let newUser = {
                email: userData.email,
                facebookId: userData.userID,
                photoUrl: userData.picture.data.url || null,
            };

            if (userData.name) {
                newUser.firstName = (userData.name.split(' '))[0];
                newUser.lastName = (userData.name.split(' '))[1];
            }

            user = await userService.create(newUser, 'facebook');
        }

        return user;
    } catch (err) {
        throw (err);
    }
};

const googleAuthorization = async (userData) => {
    try {
        let requiredFields = ['email', 'userID'];
        checker.checkRequiredFields(userData, requiredFields);
        userData.email = checker.checkEmail(userData.email);

        let user = await userService.getOne({ email: userData.email });
        if (user) {
            let updateData = { lastActive: new Date() };
            if (!user.facebookId) updateData.facebookId = userData.id;
            user = await user.update(updateData);
        } else {
            let newUser = {
                password: null,
                email: userData.email,
                googleId: userData.id,
                photoUrl: userData.picture || null,
            };

            if (userData.name) {
                newUser.firstName = (userData.name.split(' '))[0];
                newUser.lastName = (userData.name.split(' '))[1];
            }

            user = await userService.create(newUser, 'google');
        }

        return user;
    } catch (err) {
        throw (err);
    }
};

module.exports = {
    webSiteAuthorization: webSiteAuthorization,
    facebookAuthorization: facebookAuthorization,
    googleAuthorization: googleAuthorization,
    getAuthData: getAuthData
};