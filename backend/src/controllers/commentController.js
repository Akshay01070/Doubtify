import commentsModel from "../models/commentsModel.js";

// Add a comment to a question or answer
const addComment = async (req, res) => {
    const { userId, questionId, answerId, body } = req.body;

    if (!userId || !body) {
        return res.status(400).json({ success: false, message: "userId and body are required" });
    }
    if (!questionId && !answerId) {
        return res.status(400).json({ success: false, message: "questionId or answerId is required" });
    }

    try {
        const comment = new commentsModel({
            user_id: userId,
            question_id: questionId || undefined,
            answer_id: answerId || undefined,
            body,
        });
        await comment.save();
        res.status(201).json({ success: true, data: comment, message: "Comment added" });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get comments for a question
const getCommentsByQuestion = async (req, res) => {
    const { questionId } = req.params;
    try {
        const comments = await commentsModel.find({ question_id: questionId }).sort({ createdAt: -1 });
        res.json({ success: true, data: comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get comments for an answer
const getCommentsByAnswer = async (req, res) => {
    const { answerId } = req.params;
    try {
        const comments = await commentsModel.find({ answer_id: answerId }).sort({ createdAt: -1 });
        res.json({ success: true, data: comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete a comment (only by owner)
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.body;

    try {
        const comment = await commentsModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        if (comment.user_id.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }
        await commentsModel.deleteOne({ _id: commentId });
        res.json({ success: true, message: "Comment deleted" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addComment, getCommentsByQuestion, getCommentsByAnswer, deleteComment };
