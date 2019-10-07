import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { registerValidation, loginValidation } from "./validators";


// @ desc Token Handlers
export const newToken = user => {
  const payload = {
    id: user._id

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
// https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e

export const showMeYourPooh = async (req, res, next) => {
  const bearer = req.headers.authorization;
  // console.log(`survey: `, bearer);
  
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
   console.log(payload)
  } catch (e) {
    return res.status(401).end();
  }
  //
  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();
  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();//this custom middleware will continuously be ran through all routes after routes /api/<endpoint>
};


// @desc initial post route for Register and Login
export const signup = async (req, res) => {
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

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email }).select("email password");
    if (!user)
      return res
        .status(400)
        .json({ errors: [{ msg: "Butterfingers or Register!" }] });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ errors: [{ msg: "Butterfingers or Reset" }] });
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (err) {
    console.log(err);
  }
};





