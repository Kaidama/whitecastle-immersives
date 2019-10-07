import { Router } from "express";
import { userData } from "../controllers/userController";
const router = Router();

router.get("/", userData);// @desc this will show you who is logged in under GET: 'localhost:5000/api/users'

export default router;
