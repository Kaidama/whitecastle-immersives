import Joi from "@hapi/joi";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { check } from "express-validator";
import bcrypt from "bcryptjs";

export const expressValidator = method => {
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

export const hapiRegister = data => {
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

export const hapiLogin = data => {
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

//Token Handlers
export const newToken = user => {
  // const payload = {
  //   id: user._id,
  //   email: user.email
  // };
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

//initial post route for Register and Login
export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!req.body) return res.status(400).send("handle the error yourself");

  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ errors: [{ msg: "try another email or have a cookie" }] });

    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log(user);
    await user.save();

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

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

// manual poo
// https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e

export const giveUsersPoo = async (req, res, next) => {
  // now you can poo everywhere

  // passport.use(
  //   new JwtStrategy(opts, (jwt_payload, done) => {
  //     User.findById(jwt_payload.id)
  //       .then(user => {
  //         if (user) {
  //           return done(null, user);
  //         }
  //         return done(null, false);
  //       })
  //       .catch(err => console.log(err));
  //   })
  // );
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }
  //
  const user = await User.findById(payload.id)
    .select("-password")
    .exec();
  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
