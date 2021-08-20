const env = require('../lib/env');
const fs = require('fs');
const path = require('path');

// check and load environment variables from .env/*.env
if (['development', 'test'].includes(env.getEnv())) {
  const pathSegments = `./.env/${env.getEnv()}.env`;
  const dotEnvPath = path.resolve(pathSegments);
  if (fs.existsSync(dotEnvPath)) {
    require('dotenv').config({path: dotEnvPath});
  }
}

let dialectOptions = process.env.DATABASE_HOST_DIALECT_OPTIONS_SSL === 'false' ? false : {
  require: false,
  rejectUnauthorized: false,
};

let options = {};
options.username = process.env.DATABASE_USERNAME;
options.password = process.env.DATABASE_PASSWORD;
options.database = process.env.DATABASE_DATABASE;
options.host = process.env.DATABASE_HOST;
options.port = 5432;
options.dialect = 'postgres';
options.logging = false;
options.dialectOptions = {
  ssl: dialectOptions
};

module.exports = options;