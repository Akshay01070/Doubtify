import bookmarkModel from "../models/bookMarksModel.js";
import questionModel from "../models/questionModel.js";

// Toggle bookmark on/off
const toggleBookmark = async (req, res) => {
    const { userId, questionId } = req.body;

    if (!userId || !questionId) {
        return res.status(400).json({ success: false, message: "userId and questionId are required" });
    }

    try {
        const existing = await bookmarkModel.findOne({ user_id: userId, question_id: questionId });

        if (existing) {
            await bookmarkModel.deleteOne({ _id: existing._id });
            return res.json({ success: true, bookmarked: false, message: "Bookmark removed" });
        } else {
            const bookmark = new bookmarkModel({ user_id: userId, question_id: questionId });
            await bookmark.save();
            return res.json({ success: true, bookmarked: true, message: "Bookmark added" });
        }
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get all bookmarked questions for a user
const getUserBookmarks = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookmarks = await bookmarkModel.find({ user_id: userId });
        const questionIds = bookmarks.map((b) => b.question_id);
        const questions = await questionModel.find({ _id: { $in: questionIds } }).sort({ createdAt: -1 });

        res.json({ success: true, data: questions });
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Check if a question is bookmarked by a user
const getBookmarkStatus = async (req, res) => {
    const { userId, questionId } = req.body;

    try {
        const existing = await bookmarkModel.findOne({ user_id: userId, question_id: questionId });
        res.json({ success: true, isBookmarked: !!existing });
    } catch (error) {
        console.error("Error checking bookmark status:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { toggleBookmark, getUserBookmarks, getBookmarkStatus };
