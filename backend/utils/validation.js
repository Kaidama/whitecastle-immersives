import * as Joi from '@hapi/joi'

const registerValidation = data => {
    const schema = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema)
}