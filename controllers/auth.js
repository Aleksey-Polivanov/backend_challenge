const
    helpers = require('../lib/helpers.js'),
    authService = require('../services/auth.js');

const authorization = async (req, res) => {
    try {
        let user = null;
        req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (!req.body.type) {
            user = await authService.webSiteAuthorization(req.body);
        }

        if (req.body.type === 'facebook') {
            req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            user = await authService.facebookAuthorization(req.body);
        }

        if (req.body.type === 'google') {
            req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            user = await authService.googleAuthorization(req.body);
        }

        return res.status(200).send({
            data: authService.getAuthData(user)
        });
    } catch (err) {
        return helpers.error(err.status || 422, err, res);
    }
};

module.exports = {
    authorization: authorization,
};
