var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/inputValidations");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", auth.validate('signup'), userController.registerLogin)

module.exports = router;
