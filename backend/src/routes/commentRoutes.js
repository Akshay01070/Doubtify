import express from 'express';
import { addComment, getCommentsByQuestion, getCommentsByAnswer, deleteComment } from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.post('/add', addComment);
commentRouter.get('/question/:questionId', getCommentsByQuestion);
commentRouter.get('/answer/:answerId', getCommentsByAnswer);
commentRouter.delete('/:commentId', deleteComment);

export default commentRouter;
