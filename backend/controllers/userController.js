const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// module.exports = {
//   register: async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     //requirements for the register
//     const { email, password } = req.body;

//     try {
//       let user = await User.findOne({ email });
//       // check if user exists
//       if (user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "User already exists" }] });
//       }
//       user = new User({
//         email,
//         password
//       });
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//       await user.save();

//       const payload = {
//         user: {
//           id: user.id,
//           email: user.email
//         }
//       };

//       jwt.sign(
//         payload,
//         process.env.SECRET_KEY,
//         {
//           expiresIn: 36000
//         },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// };

module.exports = {
  registerLogin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //requirements for the register
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // check if user exists
      if (!user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });

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
          user: {
            id: user.id,
            email: user.email
          }
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
      } else {
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
          const payload = {
            id: user.id,
            email: user.email
          }

          jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: 36000
          },
          (err, token) => {
            if(err) throw err 
            res.json({token})
          }
          )
        }
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
};

// const isMatch =  await bcrypt.compare( params.password, user.password)
// if(!isMatch){
//     return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })

// }
//   const payload = {
//       id: user._id,
//       email: user.email
//   }
//   jwt.sign(
//     payload,
//     process.env.SECRET_KEY,
//     {
//       expiresIn: 3600
//     },
//     (err, token) => {
//       if (err) {
//         throw err;
//       } else {
//         let success = {};
//         success.token = `Bearer ${token}`;
//       }
//     }
//   );
