import express from 'express';
import { toggleBookmark, getUserBookmarks, getBookmarkStatus } from '../controllers/bookmarkController.js';

const bookmarkRouter = express.Router();

bookmarkRouter.post('/toggle', toggleBookmark);
bookmarkRouter.get('/user/:userId', getUserBookmarks);
bookmarkRouter.post('/status', getBookmarkStatus);

export default bookmarkRouter;
