const express = require('express'),
    app = express();

const getEnv = () => {
    return app.get('env');
};

const getRootUrl = (environment, type) => {
    switch (environment || getEnv()) {
        case 'test':
            return 'http://localhost:3002';

        case 'development':
            if (type) {
                return 'http://127.0.0.1:3000';
            } else {
                return 'http://localhost:3000';
            }

        case 'staging':
            // return 'https://staging.test.com';

        case 'production':
            // return 'https://www.test.com';
    }
};

module.exports = {
    getEnv: getEnv,
    getRootUrl: getRootUrl
};