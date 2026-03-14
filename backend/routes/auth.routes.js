import express from 'express'
import { logout, signUp, userLogin } from '../controller/auth.controller.js'
import { verifyJWT } from '../middleware/verifyJWT.js'


const authRouter = express.Router()

authRouter.post('/usersignup', signUp)
authRouter.post('/userlogin', userLogin)
authRouter.post('/logout', verifyJWT, logout)



export default authRouter