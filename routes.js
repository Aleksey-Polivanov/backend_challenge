const
    user = require('./controllers/user.js'),
    auth = require('./controllers/auth.js'),
    password = require('./controllers/password.js'),

    credentials = require('./credentials.js'),
    env = require('./lib/env.js'),

    expressJwt = require('express-jwt'),
    path = require('path');

const jwtSecret = credentials.JWTSecret;
const jwtOptions = {secret: jwtSecret, algorithms: ['HS256']};

module.exports = (app) => {
    // Force secure SSL connections in staging and production
    // See http://jaketrent.com/post/https-redirect-node-heroku/
    app.use(function (req, res, next) {
        if (env.getEnv() !== 'development' && env.getEnv() !== 'test' && req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        next();
    });

    app.get('/test', (req, res) => {
        res.send('wtf');
    });

    // Auth
    app.post('/api/auth', auth.authorization);

    // Password
    app.post('/api/forgot-password', password.forgotPassword);
    app.post('/api/reset-password', password.resetPassword);
    app.get('/api/validate-token', password.validateResetToken);

    // User
    app.post('/api/user', user.create);
    app.get('/api/users', expressJwt(jwtOptions), user.getAll);
    app.get('/api/users/me', expressJwt(jwtOptions), user.getOne);
    app.put('/api/users/me', expressJwt(jwtOptions), user.update);
    app.delete('/api/users/me', expressJwt(jwtOptions), user.remove);

    app.post('/api/admin/user', expressJwt(jwtOptions), user.create);
    app.put('/api/admin/users/:id', expressJwt(jwtOptions), user.adminUpdate);
    app.delete('/api/admin/users/:id', expressJwt(jwtOptions), user.adminRemove);
    app.get('/api/admin/users', expressJwt(jwtOptions), user.adminGetAll);
    app.get('/api/admin/users/:id', expressJwt(jwtOptions), user.adminGetOne);
    
    app.use((req, res) => {
        res.status(404).send({
            success: false,
            error: 'Not found'
        });
    });

    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({
                success: false,
                error: 'Unauthorized'
            });
        }

        res.status(401);
        res.send(`${err} 401`);
    });
};
