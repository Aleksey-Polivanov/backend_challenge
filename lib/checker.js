const
    validator = require('email-validator');

const checkAuthorized = (user) => {
    try {
        if (!user && !user.id) {
            throw ({ status: 401, message: 'Unauthorized', stack: new Error().stack });
        }
    } catch (err) {
        throw (err);
    }
};

const checkPhone = (phone) => {
    try {
        if (!(/^[0-9]+$/.test(phone))) {
            throw ({status: 422, message: `Field phone must contain only digits`, stack: new Error().stack});
        }
    } catch (err) {
        throw (err);
    }
};

const checkPassword = (password) => {
    try {
        if (password.length < 6) {
            throw ({status: 422, message: `Password must be at least 6 characters`, stack: new Error().stack});
        }
    } catch (err) {
        throw (err);
    }
};

const checkName = (data) => {
    try {
        for (let field in data) {
            if (~['firstName', 'lastName', 'name', 'facilityName', ].indexOf(field) && (!data[field] || data[field].length < 2) ) {
                throw ({status: 422, message: `${field} must be at least 2 characters`, stack: new Error().stack});
            }
        }
    } catch (err) {
        throw (err);
    }
};

const checkRequiredFields = (data, requiredFields, isNull) => {
    try {
        if (isNull) {
            for (let field in data) {
                if (~requiredFields.indexOf(field) && !data[field]) {
                    throw ({status: 422, message: `Field ${field} can't be null`, stack: new Error().stack});
                }
            }
        } else {
            if (requiredFields.length) {
                for (let field in data) {
                    if (~requiredFields.indexOf(field) && data[field]) {
                        requiredFields.splice(requiredFields.indexOf(field), 1);
                    }
                }

                if (requiredFields.length) {
                    let words = (requiredFields.length > 1) ? 'fields' : 'field';
                    let message = `Please fill in the required ${words}: ${requiredFields.join(', ')}`;

                    throw ({status: 422, message: message, stack: new Error().stack});
                }
            }
        }
    } catch (err) {
        throw (err);
    }
};

const checkEmail = (email) => {
    try {
        email = email.toLowerCase();
        if (!validator.validate(email)) {
            throw ({status: 422, message: 'Invalid email address, try again', stack: new Error().stack});
        }

        return email;
    } catch (err) {
        throw (err);
    }
};

module.exports = {
    checkAuthorized: checkAuthorized,
    checkEmail: checkEmail,
    checkPhone: checkPhone,
    checkName: checkName,
    checkRequiredFields: checkRequiredFields,
    checkPassword: checkPassword
};
