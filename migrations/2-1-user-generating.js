'use strict';

const {User} = require('../models');
const faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        if (process.env.NODE_ENV !== 'production') {
            let userCount = 100;
            let newUsers = [];
            for (let i = 0; i < userCount; i++) {
                newUsers.push({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: faker.unique(faker.internet.email),
                    isAdmin: false,

                    password: '12345678',

                    phone: faker.phone.phoneNumber(),
                    userPhotoUrl: faker.image.avatar(),
                });
            }

            await User.bulkCreate(newUsers);
        }
    },
    down: async (queryInterface, Sequelize) => {
    }
};
