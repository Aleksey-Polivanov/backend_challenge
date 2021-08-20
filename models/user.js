'use strict';
const passwordService = require('../services/password');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.TEXT
        },
        lastName: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT,
            notNull: true,
            isEmail: true,
            unique: true
        },
        password: {
            type: DataTypes.TEXT
        },
        phone: {
            type: DataTypes.TEXT
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        userPhotoUrl: {
            type: DataTypes.TEXT
        },
    });

    User.beforeCreate(async (user, options) => {
        try {
            user.email = user.email.toLowerCase();

            if (user.password) {
                user.password = await passwordService.hashPassword(user.password);
            }

            return user
        } catch (err) {
            throw (err);
        }
    });

    User.beforeBulkCreate(async (users, options) => {
        try {
            for (let user of users) {
                user.email = user.email.toLowerCase();

                if (user.password) {
                    user.password = await passwordService.hashPassword(user.password);
                }
            }

            return users
        } catch (err) {
            throw (err);
        }
    });

    return User;
};
