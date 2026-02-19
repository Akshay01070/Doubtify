import express from 'express'
import { addAnswer, getAllAnswersByQuesId, getAnswerCount, getAnswersByUserId } from '../controllers/answerController.js';
import { upload } from '../middlewares/multer.middleware.js';

const answerRouter = express.Router();

answerRouter.post('/:userId/:questionId/add', upload.array('files'), addAnswer);
answerRouter.get('/count/:questionId', getAnswerCount);
answerRouter.get('/user/:userId', getAnswersByUserId);
answerRouter.get('/:quesId', getAllAnswersByQuesId);

export default answerRouter;