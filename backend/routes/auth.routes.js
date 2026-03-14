import express from 'express'
import { logout, signUp, totalUser, userLogin, userProfile } from '../controller/auth.controller.js'
import { isAdmin, verifyJWT } from '../middleware/verifyJWT.js'


const authRouter = express.Router()

authRouter.post('/usersignup', signUp)
authRouter.post('/userlogin', userLogin)
authRouter.post('/logout', verifyJWT, logout)
authRouter.get('/me', verifyJWT, userProfile)
authRouter.get('/allusers', verifyJWT, isAdmin, totalUser)



export default authRouter