import express from "express";
import { isAuthenticated as auth} from "../auth/auth.js";
import * as userController  from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get('/info/:uid', auth, userController.getUser)
userRouter.delete('/delete/:uid', userController.deleteUser)
userRouter.patch('/update/:uid', userController.updateUser)
userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.signup)
userRouter.get('/refreshtoken/:uid', userController.refreshToken)
userRouter.post('/auth/google', userController.googleSignin)
userRouter.post('/auth/github/', userController.githubSignin)

export default userRouter