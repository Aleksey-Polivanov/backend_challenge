'use strict';

const {User} = require('../models/index');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await User.create({ firstName: 'Admin', lastName: 'Test', email: 'admin@challenge.com', isAdmin: true, password: '12345678' });
    },
    down: async (queryInterface, Sequelize) => {
    }
};
