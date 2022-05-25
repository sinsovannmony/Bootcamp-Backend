const Joi = require("@hapi/joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(2).required(),
        email: Joi.string().min(8).required(),
        password: Joi.string().required(),
        role: Joi.string(),
        phone_number: Joi.string(),
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(8).required(),
        password: Joi.string().required(),
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
