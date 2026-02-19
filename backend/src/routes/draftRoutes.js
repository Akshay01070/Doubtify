import express from 'express';
import { saveDraft, getUserDrafts, deleteDraft, publishDraft } from '../controllers/draftController.js';

const draftRouter = express.Router();

draftRouter.post('/save', saveDraft);
draftRouter.get('/user/:userId', getUserDrafts);
draftRouter.delete('/:draftId', deleteDraft);
draftRouter.post('/:draftId/publish', publishDraft);

export default draftRouter;
