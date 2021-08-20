const fs = require('fs');
const path = require('path');
const env = require('./lib/env');

// check and load environment variables from .env/*.env
if (['development', 'test'].includes(env.getEnv())) {
    const pathSegments = `./.env/${env.getEnv()}.env`;
    const dotEnvPath = path.resolve(pathSegments);
    if (fs.existsSync(dotEnvPath)) {
        require('dotenv').config({path: dotEnvPath});
    }
}

module.exports = {
    adminId: {
        test: 10000,
        development: 10000,
        staging: 10000,
        production: 10000
    },

    JWTSecret: process.env.JWT_SECRET
};
