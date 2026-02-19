import questionModel from "../models/questionModel.js";
import upvoteModel from "../models/upvotesModel.js";
import uploadOnCloud from "../Utils/cloudinary.js";
import fs from 'fs';

const addQuestion = async (req, res) => {
  const { userId } = req.params;
  const { body, categories, subCategories, category, subCategory } = req.body;
  const files = req.files;

  // Accept both field name variants from frontend
  const cat = categories || category || '';
  const subCat = subCategories || subCategory || '';

  if (!userId || !body) {
    return res.status(400).json({ message: "Question body is required" });
  }

  let filesArray = [];
  if (files && files.length > 0) {
    await Promise.all(files.map(async (file) => {
      const localFilepath = file ? file.path : null;
      if (localFilepath) {
        try {
          const cloudinaryResponse = await uploadOnCloud(localFilepath);
          filesArray.push(cloudinaryResponse.url);
          fs.unlinkSync(localFilepath);
        } catch (error) {
          console.error('Error uploading to Cloudinary:', error);
        }
      }
    }));
  }

  try {
    const question = new questionModel({
      userId: userId,
      body: body,
      categories: cat,
      subCategories: subCat,
      files: filesArray
    });

    await question.save();
    res.status(201).json({ success: true, message: "Question added successfully", data: { question } });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ success: false, message: "Failed to add question" });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: questions });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Error fetching questions" });
  }
};

const getQuesById = async (req, res) => {
  const { quesId } = req.params;
  try {
    const question = await questionModel.findById(quesId);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    res.json({ success: true, data: question });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Error fetching question" });
  }
};

const getQuesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const questions = await questionModel.find({ userId: userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: questions });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Error fetching questions" });
  }
};

// Get distinct categories with question counts
const getCategories = async (req, res) => {
  try {
    const categories = await questionModel.aggregate([
      { $match: { categories: { $ne: '', $exists: true } } },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Search questions
const searchQuestions = async (req, res) => {
  const { q } = req.query;
  try {
    const questions = await questionModel.find({
      body: { $regex: q || '', $options: 'i' }
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: questions });
  } catch (error) {
    console.error("Error searching questions:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await questionModel.findByIdAndDelete(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    res.json({ success: true, message: "Question deleted" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const upvoteQuestion = async (req, res) => {
  const { questionId, userId } = req.body;

  try {
    const existingUpvote = await upvoteModel.findOne({ questionId, userId });
    const question = await questionModel.findById(questionId);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    if (existingUpvote) {
      await upvoteModel.deleteOne({ _id: existingUpvote._id });
      if (question.upvotes > 0) {
        question.upvotes -= 1;
      }
      await question.save();
      return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote removed' });
    } else {
      const upvoteInfo = new upvoteModel({ questionId, userId });
      await upvoteInfo.save();
      question.upvotes += 1;
      await question.save();
      return res.json({ success: true, upvotes: question.upvotes, question, message: 'Upvote added' });
    }
  } catch (error) {
    console.error("Error updating upvotes:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getUpvoteStatus = async (req, res) => {
  const { questionId, userId } = req.body;

  try {
    const existingUpvote = await upvoteModel.findOne({ questionId, userId });

    if (existingUpvote) {
      return res.json({ success: true, isUpvoted: true });
    } else {
      return res.json({ success: true, isUpvoted: false });
    }
  } catch (error) {
    console.error("Error checking upvote status:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { addQuestion, getAllQuestions, getQuesById, getQuesByUserId, upvoteQuestion, getUpvoteStatus, getCategories, searchQuestions, deleteQuestion };