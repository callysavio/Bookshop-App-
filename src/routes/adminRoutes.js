import { getUsers, getUser, deleteUser } from "../controllers/adminController.js";
import { authorizeUser } from "../middlewares/authorize.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import express from "express";

const router = express.Router()

router.route('/users').get(authorizeUser,checkRoles(['admin']), getUsers)
router.route('/user').get(authorizeUser, checkRoles(['admin']), getUser)
router.route('/delete-user/:id').delete(authorizeUser, checkRoles(['admin']),deleteUser)


export default router