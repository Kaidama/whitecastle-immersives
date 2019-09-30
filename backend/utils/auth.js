import * as Joi from '@hapi/joi'
import { User } from '../models/User'
import jwt from 'jsonwebtoken'

export const registerValidation = data => {
    const schema = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema)
}

export const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}

export const newToken = user => {
    const payload = {
        id: user._id,
        email: user.email
    }

    return jwt.sign(payload, process.env.SECRET_KEY,{ expiresIn: '1d'})
}

// export const verifyToken = token => 
