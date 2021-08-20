const
    env = require('./env'),
    _ = require('underscore'),
    moment = require('moment');

const printUpdateData = (name, data) => {
    try {
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        console.log(`${name}:`);
        console.log(`~~~~~~~~~~~~~`);
        for (let field in data) {
            console.log(`${field}: ${data[field]}`);
        }
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    } catch (err) {
        throw (err);
    }
};

const error = (status, err, res, options) => {
    try {
        if (env.getEnv() !== 'test') console.error('ERROR: ', err);

        let errorData = { success: false };

        if (!~['production', 'development'].indexOf(env.getEnv())) errorData.stack = err.stack;
        errorData.error = (err.message) ? err.message : (err.error) ? err.error : err.toString();

        if (err.name === 'SequelizeUniqueConstraintError' && err.errors.length) {
            errorData.error = err.errors[0].message;
        }

        if (options) errorData = Object.assign({}, errorData, options);

        return res.status(status).send(errorData);
    } catch (err) {
        throw (err);
    }
};

const getModelFields = (model, unnecessaryFields = []) => {
    try {
        let notUpdatedFields = ['id', 'createdAt', 'updatedAt'].concat(unnecessaryFields);
        let modelFields = [];

        for (let field in model.tableAttributes ) {
            if (!~notUpdatedFields.indexOf(field)) {
                modelFields.push(field);
            }
        }

        return modelFields;
    } catch (err) {
        throw (err);
    }
};

const getModelData = (modelFields, modelData) => {
    try {
        return _.pick(modelData, ...modelFields);
    } catch (err) {
        throw (err);
    }
};

module.exports = {
    error: error,
    getModelFields: getModelFields,
    getModelData: getModelData,

    printUpdateData: printUpdateData
};
