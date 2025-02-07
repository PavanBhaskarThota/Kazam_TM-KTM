import express from "express";
import UserController from "../Controllers/UserController";
import { auth } from "../Middleware/auth";

const userRouter = express.Router();

userRouter.post('/signup', UserController.signup)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', auth, UserController.logout)

export default userRouter