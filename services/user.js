const
    helpers = require('../lib/helpers'),
    checker = require('../lib/checker'),
    passwordService = require('../services/password'),

    moment = require('moment'),

    {User} = require('../models/index');

const getData = (user, action, isAdmin) => {
    try {
        let data = {};

        if (action === 'getAll') {
            if (isAdmin) {
                data = {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    registrationDate: moment(user.createdAt).format('MMMM, D YYYY'),
                    isAdmin: user.isAdmin,
                    isCampAdmin: user.isCampAdmin
                }
            }
        }

        return data
    } catch (err) {
        throw (err);
    }
};

const getAll = async () => {
    try {
        return await User.findAll({order: [['id', 'ASC']]});
    } catch (err) {
        throw (err);
    }
};

const getOne = async (findQuery) => {
    try {
        return await User.findOne({ where: findQuery });
    } catch (err) {
        throw (err);
    }
};

const create = async (userData, type) => {
    try {
        let requiredFields = ['email', 'firstName', 'lastName'];

        if (!type) {
            requiredFields.push('password', 'phone');
        }

        checker.checkRequiredFields(userData, requiredFields);
        userData.email = checker.checkEmail(userData.email);
        if (userData.password) {
            checker.checkPassword(userData.password);
        }

        checker.checkName(userData);

        let createdFields = ['firstName', 'lastName', 'email', 'password', 'phone', 'isAdmin'];
        let newUser = helpers.getModelData(createdFields, userData);

        return await User.create(newUser);
    } catch (err) {
        throw (err);
    }
};

const update = async (user, userData) => {
    try {
        let requiredFields = ['email', 'newPassword'];
        checker.checkRequiredFields(userData, requiredFields, true);

        if (userData.email) {
            userData.email = checker.checkEmail(userData.email);
        }

        if (userData.newPassword) {
            checker.checkPassword(userData.newPassword);
            userData.password = await passwordService.hashPassword(userData.newPassword);
        }

        checker.checkName(userData);

        // ToDo: should there be a password in update user data?
        let updatedFields = ['firstName', 'lastName', 'email', 'phone', 'isAdmin', 'isCampAdmin'];
        let updateData = helpers.getModelData(updatedFields, userData);

        return await user.update(updateData);
    } catch (err) {
        throw (err);
    }
};

const remove = async (user) => {
    try {
        await user.destroy();
    } catch (err) {
        throw (err);
    }
};

const isAdmin = async (id) => {
    try {
        let user = await User.findOne({ where: { id: id } });

        if (!user) {
            throw({ status: 404, error: 'User not found', stack: new Error().stack });
        }

        if (!user.isAdmin) {
            throw({ status: 401, error: 'Unauthorized', stack: new Error().stack });
        }

        return user;
    } catch (err) {
        throw (err);
    }
};

const isCampAdmin = async (id) => {
    try {
        let user = await User.findOne({ where: { id: id } });

        if (!user) {
            throw({ status: 404, error: 'User not found', stack: new Error().stack });
        }

        if (!user.isCampAdmin) {
            throw({ status: 401, error: 'Unauthorized', stack: new Error().stack });
        }

        return user;
    } catch (err) {
        throw (err);
    }
};

module.exports = {
    getData: getData,

    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    remove: remove,

    isAdmin: isAdmin,
    isCampAdmin: isCampAdmin,
};