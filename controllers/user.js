const
    helpers = require('../lib/helpers.js'),
    checker = require('../lib/checker.js'),

    userService = require('../services/user.js'),
    authService = require('../services/auth.js');

const create = async (req, res) => {
    try {
        let user = await userService.create(req.body);

        return res.status(200).send({
            success: true,
            notice: 'User has been created successfully',
            data: authService.getAuthData(user)
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const getAll = async (req, res) => {
    try {
        checker.checkAuthorized(req.user);
        let users = await userService.getAll();

        return res.status(200).send({
            success: true,
            data: {
                users: users
            }
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const getOne = async (req, res) => {
    try {
        checker.checkAuthorized(req.user);

        let user = await userService.getOne({id: req.user.id});

        if (!user) {
            throw ({status: 404, message: 'User not found', stack: new Error().stack});
        }

        return res.status(200).send({
            success: true,
            data: {
                user: user
            }
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const update = async (req, res) => {
    try {
        checker.checkAuthorized(req.user);

        let user = await userService.getOne({id: req.user.id});

        if (!user) {
            throw ({status: 404, message: 'User not found', stack: new Error().stack});
        }

        user = await userService.update(user, req.body);

        return res.status(200).send({
            success: true,
            notice: 'User has been updated successfully',
            data: authService.getAuthData(user)
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const remove = async (req, res) => {
    try {
        checker.checkAuthorized(req.user);

        let user = await userService.getOne({id: req.user.id});

        if (!user) {
            throw ({status: 404, message: 'User not found', stack: new Error().stack});
        }

        await userService.remove(user, req.body);

        return res.status(200).send({
            success: true,
            notice: 'User has been removed successfully',
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const adminUpdate = async (req, res) => {
    try {
        checker.checkAuthorized(req.user);
        await userService.isAdmin(req.user.id);

        if (!req.params.id) {
            throw ({status: 404, message: 'User id not found', stack: new Error().stack});
        }

        let user = await userService.getOne({id: req.params.id});

        if (!user) {
            throw ({status: 404, message: 'User not found', stack: new Error().stack});
        }

        user = await userService.update(user, req.body);

        return res.status(200).send({
            success: true,
            notice: 'User has been updated successfully',
            data: authService.getAuthData(user)
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const adminRemove = async (req, res) => {
    try {
        checker.checkAuthorized(req.user);
        await userService.isAdmin(req.user.id);

        if (!req.params.id) {
            throw ({status: 404, message: 'User id not found', stack: new Error().stack});
        }

        let user = await userService.getOne({id: req.params.id});

        if (!user) {
            throw ({status: 404, message: 'User not found', stack: new Error().stack});
        }

        await userService.remove(user, req.body);

        return res.status(200).send({
            success: true,
            notice: 'User has been removed successfully',
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const adminGetAll = async (req, res) => {
    try {
        checker.checkAuthorized(req.user);
        await userService.isAdmin(req.user.id);

        let users = await userService.getAll();

        let usersData = [];

        for (let user of users) {
            usersData.push(userService.getData(user, 'getAll', true));
        }

        return res.status(200).send({
            success: true,
            data: {
                users: usersData
            }
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

const adminGetOne = async (req, res) => {
    try {
        checker.checkAuthorized(req.user);
        await userService.isAdmin(req.user.id);

        if (!req.params.id) {
            throw ({status: 404, message: 'User id not found', stack: new Error().stack});
        }

        let user = await userService.getOne({id: req.params.id});

        if (!user) {
            throw ({status: 404, message: 'User not found', stack: new Error().stack});
        }

        return res.status(200).send({
            success: true,
            data: {
                user: user
            }
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    remove: remove,

    adminUpdate: adminUpdate,
    adminRemove: adminRemove,
    adminGetAll: adminGetAll,
    adminGetOne: adminGetOne
};
