import express from 'express'
import verifyToken from '../middlewares/Auth'
const router = express.Router()
import { deleteUser,generateAvatar,updateUser,getUsers,updateToAdmin,getUser } from '../controllers/User'

router.use(verifyToken)


router.get('/',getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/admin', updateToAdmin)
router.post('/avatar', generateAvatar)

export default router