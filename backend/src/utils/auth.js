import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { registerValidation } from "./validators";

//Token Handlers

export const newToken = user => {
  const payload = {
    id: user._id,
    email: user.email
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
};

//initial post route for Register and Login
export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const { error } = registerValidation(req.body);
  // console.log(req.body)
  if (error) return res.status(400).send(error.details[0].message);

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
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
  } catch (err) {
    console.log(err);
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
