import express from 'express'
import {Login,Logout,Register , LoginWithGoogle} from '../controllers/Auth'


const router = express.Router()


router.post('/register',Register)
router.post('/login', Login)
router.post('/logout', Logout)
router.post('/google', LoginWithGoogle)

export default router
