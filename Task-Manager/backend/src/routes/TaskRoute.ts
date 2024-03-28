import express from 'express';
import {createTask,deleteTask,getTask,getTasks,updateTask} from '../controllers/Task';
import verifyToken from '../middlewares/Auth';

const router = express.Router();



router.use(verifyToken)

router.get('/',getTasks)
router.get('/:id', getTask)
router.post('/create-task', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)










export default router

