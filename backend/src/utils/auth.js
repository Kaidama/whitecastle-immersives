import * as Joi from "@hapi/joi";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { check } from "express-validator";

export const validate = method => {
  switch (method) {
    case "signup": {
      return [
        check("firstName", "First name can not be blank")
          .not()
          .isEmpty(),
        check("lastName", "Last name can not be blank")
          .not()
          .isEmpty(),
        check("email", "Please include valid email").isEmail(),
        check(
          "password",
          "Please enter password with at least 6 characters long"
        ).isLength({ min: 6 })
      ];
    }
    case "login": {
      return [
        check("email", "Valid Email or Password is required")
          .isEmail()
          .not()
          .isEmpty(),
        check("password", "Email or Password required ").exists()
      ];
    }
  }
};


export const registerValidation = data => {
  const schema = {
    firstName: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

export const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

export const newToken = user => {
  const payload = {
    id: user._id,
    email: user.email
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!req.body) {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  }
  -o

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body) {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  }
};
export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}


