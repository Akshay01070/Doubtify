import express from 'express'
import { addQuestion, getAllQuestions, getQuesById, getQuesByUserId, getUpvoteStatus, upvoteQuestion, getCategories, searchQuestions, deleteQuestion } from '../controllers/questionController.js';
import { upload } from '../middlewares/multer.middleware.js';

const questionRouter = express.Router();

questionRouter.post('/:userId/add', upload.array('files'), addQuestion);
questionRouter.get('/questions', getAllQuestions);
questionRouter.get('/categories', getCategories);
questionRouter.get('/search', searchQuestions);
questionRouter.get('/get/:userId', getQuesByUserId);
questionRouter.post('/upvote', upvoteQuestion);
questionRouter.post('/upvoteStatus', getUpvoteStatus);
questionRouter.delete('/:questionId', deleteQuestion);
questionRouter.get('/:quesId', getQuesById);

export default questionRouter;