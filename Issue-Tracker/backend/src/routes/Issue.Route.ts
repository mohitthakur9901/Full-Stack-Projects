import express from 'express';
import verifyToken from '../middlewares/Auth';
import { createIssue , updateIssue , getAllIssues,countIssues} from '../controllers/Issue';

const router = express.Router();

router.use(verifyToken);

router.post('/new-issue' , createIssue)
router.put('/update-issue/:id', updateIssue)
router.get('/counts', countIssues)
router.get('/', getAllIssues)


export default router;