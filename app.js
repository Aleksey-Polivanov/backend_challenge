process.env.TZ = 'UTC';

const
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,

    env = app.get('env'),

    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    compression = require('compression'),
    morgan = require('morgan')('dev'),
    expressLogger = require('express-logger')({path: `${__dirname}/log/requests.log`}),
    robots = require('express-robots-txt'),
    pg = require('pg');

require('pg').defaults.parseInt8 = true;
require('pg-parse-float')(pg);

app.use(bodyParser.json({
    limit: '2mb',
}));

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cookieParser());
// Use compression
app.use(compression());

if (env === 'test') {
    app.set('port', 3005);
}

// robots.txt
if (env === 'production') {
    app.use(robots({UserAgent: '*'}));
} else {
    app.use(robots({UserAgent: '*', Disallow: '/'}));
}

app.use(helmet.xssFilter());
app.use(helmet.hsts({
    maxAge: 7776000000,
    includeSubDomains: true,
}));

app.use(helmet.hidePoweredBy());

// Logging
switch (env) {
    case 'development':
        // compact, colorful dev logging
        app.use(morgan);
        break;

    default:
        app.use(expressLogger);
}

// Route
require('./routes.js')(app);

//start server
app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});

module.exports = app;
