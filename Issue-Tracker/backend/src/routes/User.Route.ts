import {LoginUser,RegisterUser , GetUsers ,DeleteUser ,UpdateUser ,updateToAdmin , totalUsers} from '../controllers/User'
import verfiyJWT from '../middlewares/Auth';


import express from 'express'
const router = express.Router()

router.post('/signup' , RegisterUser);
router.post('/signin', LoginUser);

router.use(verfiyJWT);
router.get('/users' , GetUsers);
router.delete('/user/:id', DeleteUser);
router.put('/user/:id',  UpdateUser);
router.put('/user/:id/admin', updateToAdmin );
router.get('/totalusers', totalUsers);

export default router