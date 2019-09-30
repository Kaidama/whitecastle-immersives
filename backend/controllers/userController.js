const User = require("../models/User");
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { registerValidation } from '../utils/validation'

module.exports = {
  register: async (req, res) => {
    const {error} = registerValidation(req.body);
    // if (error) return res.status(400).json({ errors: errors.array() });
    if (error) return res.status(400).send(error.details[0].message);
    //requirements for the register
    const { firstName, lastName, email, password } = req.body;
    
    // const emailExist = await User.findOne({ email })
    // if(emailExist) return res.status(400).send('User email already exists')
    
    try {
      let user = await User.findOne({email})
      if(user) return res.status(400).send('User email already exists')


        user = new User({
          firstName,
          lastName,
          email,
          password
        });

        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
          id: user._id,
          email: user.email
        };

        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 36000
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  login: async (req, res) => {
    const errors = validationResult(req.body);
    console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        } else {
          const payload = {
            id: user._id,
            email: user.email
          };

          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: 36000
            },
            (err, token) => {
              if (err) throw err;

              token = `Bearer ${token}`

              res.json({ token });
            }
          );
        }
      } else {
        res
          .status(400)
          .json({ errors: [{ msg: "Invalid email please register" }] });
      }
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
};
