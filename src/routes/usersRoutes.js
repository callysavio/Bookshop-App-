import { registerUser, updateUser, loginUser } from "../controllers/usersController.js";
import { authorizeUser } from "../middlewares/authorize.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import express from "express";

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/update-user/:id').patch(authorizeUser,checkRoles(['regular-user','admin']), updateUser)
router.route('/login').post(loginUser)


export default router