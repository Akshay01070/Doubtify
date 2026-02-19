import draftModel from "../models/draftModel.js";
import answerModel from "../models/answerModel.js";
import questionModel from "../models/questionModel.js";

// Save a draft
const saveDraft = async (req, res) => {
    const { userId, body, questionId, draftId, type, category } = req.body;

    if (!userId || !body) {
        return res.status(400).json({ success: false, message: "userId and body are required" });
    }

    try {
        if (draftId) {
            // Update existing draft
            const draft = await draftModel.findByIdAndUpdate(
                draftId,
                { body, question_id: questionId || undefined, type, category },
                { new: true }
            );
            if (!draft) {
                return res.status(404).json({ success: false, message: "Draft not found" });
            }
            return res.json({ success: true, data: draft, message: "Draft updated" });
        }

        // Create new draft
        const draft = new draftModel({
            user_id: userId,
            body,
            question_id: questionId || undefined,
            type: type || 'answer',
            category: category || undefined
        });
        await draft.save();
        res.status(201).json({ success: true, data: draft, message: "Draft saved" });
    } catch (error) {
        console.error("Error saving draft:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get all drafts for a user
const getUserDrafts = async (req, res) => {
    const { userId } = req.params;

    try {
        const drafts = await draftModel.find({ user_id: userId }).sort({ createdAt: -1 });
        res.json({ success: true, data: drafts });
    } catch (error) {
        console.error("Error fetching drafts:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete a draft
const deleteDraft = async (req, res) => {
    const { draftId } = req.params;

    try {
        const draft = await draftModel.findByIdAndDelete(draftId);
        if (!draft) {
            return res.status(404).json({ success: false, message: "Draft not found" });
        }
        res.json({ success: true, message: "Draft deleted" });
    } catch (error) {
        console.error("Error deleting draft:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Publish a draft (convert to answer/question)
const publishDraft = async (req, res) => {
    const { draftId } = req.params;

    try {
        const draft = await draftModel.findById(draftId);
        if (!draft) {
            return res.status(404).json({ success: false, message: "Draft not found" });
        }

        if (draft.type === 'question') {
            // Create question from draft
            const question = new questionModel({
                userId: draft.user_id,
                body: draft.body,
                categories: draft.category || 'Other',
                files: [],
            });
            await question.save();
            await draftModel.deleteOne({ _id: draftId });
            return res.json({ success: true, data: question, message: "Draft published as question" });
        } else {
            // It's an answer draft
            if (!draft.question_id) {
                return res.status(400).json({ success: false, message: "Draft must be linked to a question to publish" });
            }

            // Create answer from draft
            const answer = new answerModel({
                userId: draft.user_id,
                questionId: draft.question_id,
                body: draft.body,
                files: [],
            });
            await answer.save();

            // Delete draft
            await draftModel.deleteOne({ _id: draftId });

            res.json({ success: true, data: answer, message: "Draft published as answer" });
        }
    } catch (error) {
        console.error("Error publishing draft:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { saveDraft, getUserDrafts, deleteDraft, publishDraft };
