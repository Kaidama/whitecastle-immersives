const { check } = require("express-validator");

module.exports = {
  validate: method => {
    switch (method) {
      case "signup": {
        return [
          check('firstName', "First name can not be blank").not().isEmpty(),
          check('lastName', "Last name can not be blank").not().isEmpty(),
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
  }
};
