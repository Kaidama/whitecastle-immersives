
import { Router } from 'express'
const router = Router()

const userController = require("../controllers/userController");
const auth = require("../utils/inputValidations");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with resources");
});

// router.post("/register");
// router.post("/login", auth.validate("login"), userController.login)
export default router
