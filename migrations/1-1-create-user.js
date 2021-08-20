'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            firstName: {
                type: Sequelize.TEXT
            },
            lastName: {
                type: Sequelize.TEXT
            },
            email: {
                type: Sequelize.TEXT,
                notNull: true,
                isEmail: true,
                unique: true
            },
            password: {
                type: Sequelize.TEXT
            },
            phone: {
                type: Sequelize.TEXT
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            facebookId: {
                type: Sequelize.TEXT
            },
            googleId: {
                type: Sequelize.TEXT
            },
            userPhotoUrl: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.addIndex('Users', ['id']);
        await queryInterface.sequelize.query('ALTER SEQUENCE "Users_id_seq" RESTART 10000');
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex('Users', ['id']);
        await queryInterface.dropTable('Users');
    }
};
